import type { SafetyItem } from '../data/gameData';

export type WeatherTemp = 'Hot' | 'Comfortable' | 'Cool' | 'Cold';
export type ThreatLevelType = 'Low' | 'Medium' | 'High'; // High implies Tear Gas risk per prompt

export interface FeedbackCard {
    message: string;
    sourceUrl: string;
    sourceName: string;
    severity: 'info' | 'warning' | 'critical' | 'success';
}

export interface SimulationResult {
    score: number;
    feedback: FeedbackCard[];
}

export const runSimulation = (
    equippedItems: SafetyItem[],
    weatherTemp: WeatherTemp,
    _isPrecipitating: boolean,
    threatLevel: ThreatLevelType
): SimulationResult => {
    let score = 100;
    const feedback: FeedbackCard[] = [];

    // Helper to deduplicate feedback if multiple items trigger same warning? 
    // Prompt implies checking items. "If user wears isAbsorbent items".

    // 1. Chemical Risk
    // "If ThreatLevel is High (Tear Gas risk) AND user wears isAbsorbent items (like Tampons/Contacts) -> Add a 'Severe Warning' with the specific sourceUrl."
    if (threatLevel === 'High') {
        const absorbentItems = equippedItems.filter(item => item.attributes.isAbsorbent);
        if (absorbentItems.length > 0) {
            score -= 30;
            // Requirement: "Add a 'Severe Warning' with the specific sourceUrl."
            absorbentItems.forEach(item => {
                feedback.push({
                    message: `SEVERE WARNING: ${item.name} can absorb tear gas chemicals internally.`,
                    sourceUrl: item.sourceUrl,
                    sourceName: item.sourceName,
                    severity: 'critical'
                });
            });
        }
    }

    // 1b. Chemical Risk (Oil-Based)
    // "Oil-based products trap pepper spray and tear gas against your skin."
    if (threatLevel === 'High') {
        const oilBasedItems = equippedItems.filter(item => item.attributes.isOilBased);
        if (oilBasedItems.length > 0) {
            score -= 20;
            oilBasedItems.forEach(item => {
                feedback.push({
                    message: `CHEMICAL TRAP: ${item.name} is oil-based and will trap chemical agents against your skin.`,
                    sourceUrl: item.sourceUrl,
                    sourceName: item.sourceName,
                    severity: 'warning'
                });
            });
        }
    }

    // 2. Fire Risk
    // "If ThreatLevel is High AND user wears isFlammable (Polyester) -> Add a 'Burn Risk' warning."
    if (threatLevel === 'High') {
        const flammableItems = equippedItems.filter(item => item.attributes.isFlammable);
        const nonFlammableItems = equippedItems.filter(item => !item.attributes.isFlammable && item.slot === 'body'); // Check for body items specifically (clothes)

        if (flammableItems.length > 0) {
            score -= 25;
            flammableItems.forEach(item => {
                feedback.push({
                    message: `BURN RISK: ${item.name} may melt into skin if exposed to flashbangs or fire.`,
                    sourceUrl: item.sourceUrl,
                    sourceName: item.sourceName,
                    severity: 'critical'
                });
            });
        } else if (nonFlammableItems.length > 0) {
            // Positive Feedback: Wearing non-flammable clothing
            nonFlammableItems.forEach(item => {
                feedback.push({
                    message: `HEAT RESISTANT: ${item.name} is made of natural fibers and won't melt in heat.`,
                    sourceUrl: item.sourceUrl,
                    sourceName: item.sourceName,
                    severity: 'success'
                });
            });
        }
    }

    // 3. Legal Risk
    // "If ThreatLevel is High AND user has isBiometric -> Add a 'Privacy Breach' warning citing the 5th Amendment."
    if (threatLevel === 'High') {
        const biometricItems = equippedItems.filter(item => item.attributes.isBiometric);
        if (biometricItems.length > 0) {
            score -= 20;
            biometricItems.forEach(item => {
                feedback.push({
                    message: `PRIVACY BREACH: Police can compel unlock of ${item.name}. Biometrics are not protected by the 5th Amendment.`,
                    sourceUrl: item.sourceUrl,
                    sourceName: item.sourceName,
                    severity: 'warning'
                });
            });
        }
    }

    // 4. Medical Risk
    // "If user has isLoosePills -> Add a warning: 'Police may confiscate unidentified pills.'"
    // This applies regardless of threat level? Prompt implies "If user has isLoosePills".
    const loosePillItems = equippedItems.filter(item => item.attributes.isLoosePills);
    if (loosePillItems.length > 0) {
        score -= 15;
        loosePillItems.forEach(item => {
            feedback.push({
                message: `CONFISCATION RISK: Police may confiscate loose pills (${item.name}) as unknown substances.`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'warning'
            });
        });
    }

    // 5. Positive: Sterile Items (Decontamination)
    // Any threat level (always good to have water)
    const sterileItems = equippedItems.filter(item => item.attributes.isSterile);
    if (sterileItems.length > 0) {
        score += sterileItems.length * 10; // +10 points per sterile item
        sterileItems.forEach(item => {
            feedback.push({
                message: `DECON PREP: ${item.name} is essential for safe eye flushing after chemical exposure. (+10 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'success'
            });
        });
    }

    // 6. Positive: Heat Resistant check (moved from Fire Risk else block to be universal bonus)
    // If not flammable, give points.
    const heatResistantItems = equippedItems.filter(item => !item.attributes.isFlammable && item.slot === 'body');
    if (heatResistantItems.length > 0) {
        score += 10;
        heatResistantItems.forEach(() => {
            // Feedback logic here is minimal as the primary goal is score adjustment.
        });
    }

    // 7. Positive: Anonymity (Burner Phone)
    const anonymousItems = equippedItems.filter(item => item.attributes.isAnonymous);
    if (anonymousItems.length > 0) {
        score += 10;
        anonymousItems.forEach(item => {
            feedback.push({
                message: `ANONYMITY PRESERVED: ${item.name} protects your identity by decoupling your comms from your personal ID. (+10 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'success'
            });
        });
    }

    // 8. Positive: Encrypted Comms (Signal App)
    const encryptedItems = equippedItems.filter(item => item.attributes.hasEncryptedComms);
    if (encryptedItems.length > 0) {
        score += 10;
        encryptedItems.forEach(item => {
            feedback.push({
                message: `SECURE COMMS: ${item.name} uses end-to-end encryption to prevent interception. (+10 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'success'
            });
        });
    }

    // 9. Positive: Signal Blocking (Faraday Bag)
    const signalBlockingItems = equippedItems.filter(item => item.attributes.isSignalBlocking);
    if (signalBlockingItems.length > 0) {
        score += 15;
        signalBlockingItems.forEach(item => {
            feedback.push({
                message: `TRACKING BLOCKED: ${item.name} prevents Stingrays (IMSI Catchers) from tracking your location. (+15 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'success'
            });
        });
    }

    // 10. Positive: Offline Navigation (Paper Map)
    const offlineNavItems = equippedItems.filter(item => item.attributes.providesOfflineNav);
    if (offlineNavItems.length > 0) {
        score += 10;
        offlineNavItems.forEach(item => {
            feedback.push({
                message: `DIGITAL RESILIENCE: ${item.name} ensures you can navigate if cell towers go down or phones are confiscated. (+10 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'success'
            });
        });
    }

    // 11. Negative: Open Toed Shoes (Flip Flops)
    const openToedItems = equippedItems.filter(item => item.attributes.isOpenToed);
    if (openToedItems.length > 0) {
        score -= 15;
        openToedItems.forEach(item => {
            feedback.push({
                message: `INJURY RISK: ${item.name} limit mobility and leave feet exposed to glass/chemicals.`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'warning'
            });
        });
    }

    // 12. Hydration Check
    const hydrationItems = equippedItems.filter(item => item.attributes.providesHydration);
    if (hydrationItems.length > 0) {
        score += 10;
        hydrationItems.forEach(item => {
            feedback.push({
                message: `HYDRATED: ${item.name} helps prevent dehydration, which can occur in any weather. (+10 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'success'
            });
        });
    } else {
        // No hydration
        score -= 10;
        feedback.push({
            message: `DEHYDRATION RISK: Dehydration can occur in any weather. Bring water or electrolytes.`,
            sourceUrl: 'https://mutualaiddisasterrelief.org/wp-content/uploads/2020/04/kupdf.net_street-medic-handbook.pdf',
            sourceName: 'mutual-aid-disaster-relief',
            severity: 'warning'
        });
    }

    // 13. Weather Specifics
    // Heat
    if (weatherTemp === 'Hot') {
        // Sun Protection
        const sunProtectionItems = equippedItems.filter(item => item.attributes.providesSunProtection);
        if (sunProtectionItems.length > 0) {
            score += 10;
            sunProtectionItems.forEach(item => {
                feedback.push({
                    message: `SUN PROTECTION: ${item.name} protects against sunburn and heat stress. (+10 PTS)`,
                    sourceUrl: item.sourceUrl,
                    sourceName: item.sourceName,
                    severity: 'success'
                });
            });
        }

        // Heat Exhaustion check (if no hydration, extra penalty)
        if (hydrationItems.length === 0) {
            score -= 10; // Additional penalty
            feedback.push({
                message: `HEAT EXHAUSTION RISK: Hydration is critical in hot weather.`,
                sourceUrl: 'https://mutualaiddisasterrelief.org/wp-content/uploads/2020/04/kupdf.net_street-medic-handbook.pdf',
                sourceName: 'mutual-aid-disaster-relief',
                severity: 'warning'
            });
        }
    }

    // Cold / Cool
    if (weatherTemp === 'Cold' || weatherTemp === 'Cool') {
        const warmthItems = equippedItems.filter(item => item.attributes.providesWarmth);
        if (warmthItems.length > 0) {
            score += 10;
            warmthItems.forEach(item => {
                feedback.push({
                    message: `WARMTH: ${item.name} helps prevent hypothermia. (+10 PTS)`,
                    sourceUrl: item.sourceUrl,
                    sourceName: item.sourceName,
                    severity: 'success'
                });
            });
        } else {
            score -= 15;
            feedback.push({
                message: `HYPOTHERMIA RISK: Hypothermia is common even in cool 40-60°F weather. Bring warm layers/chem warmers.`,
                sourceUrl: 'https://mutualaiddisasterrelief.org/wp-content/uploads/2020/04/kupdf.net_street-medic-handbook.pdf',
                sourceName: 'mutual-aid-disaster-relief',
                severity: 'warning'
            });
        }
    }

    // Clamp score
    score = Math.min(100, Math.max(0, score));

    return {
        score,
        feedback
    };
};
