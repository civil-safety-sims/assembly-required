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
    isPrecipitating: boolean,
    threatLevel: ThreatLevelType
): SimulationResult => {
    let score = 50;
    const feedback: FeedbackCard[] = [];

    // Helper checks
    const isChemicalThreat = threatLevel === 'High' || threatLevel === 'Medium';
    const isKineticThreat = threatLevel === 'High';

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

    // 14. Precipitation (Rain)
    if (isPrecipitating) {
        const waterResistantItems = equippedItems.filter(item => item.attributes.providesWaterResistance);
        if (waterResistantItems.length > 0) {
            score += 10;
            waterResistantItems.forEach(item => {
                feedback.push({
                    message: `DRY & SAFE: ${item.name} prevents hypothermia and keeps you effective in wet weather. (+10 PTS)`,
                    sourceUrl: item.sourceUrl,
                    sourceName: item.sourceName,
                    severity: 'success'
                });
            });
        } else {
            score -= 20;
            feedback.push({
                message: `HYPOTHERMIA RISK: Getting wet drastically increases risk of hypothermia. Bring rain gear.`,
                sourceUrl: 'https://www.nrdc.org/stories/how-protest-safely',
                sourceName: 'NRDC Health & Safety',
                severity: 'warning'
            });
        }
    }

    // 15. Power / Tech resilience
    const powerItems = equippedItems.filter(item => item.attributes.providesPower);
    if (powerItems.length > 0) {
        score += 5;
        powerItems.forEach(item => {
            feedback.push({
                message: `POWER SECURE: ${item.name} ensures you can maintain comms during long events. (+5 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'info'
            });
        });
    }

    // 16. Financial Autonomy (Cash)
    const resourceItems = equippedItems.filter(item => item.attributes.isUntraceable && item.attributes.providesResource);
    if (resourceItems.length > 0) {
        score += 5;
        resourceItems.forEach(item => {
            feedback.push({
                message: `FINANCIAL AUTONOMY: ${item.name} allows transactions when networks are down or cards are tracked. (+5 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'info'
            });
        });
    }

    // 17. Legal Meds
    const prescriptionItems = equippedItems.filter(item => item.attributes.requiresPrescription);
    if (prescriptionItems.length > 0) {
        score += 5; // Small bonus for doing it right
        prescriptionItems.forEach(item => {
            feedback.push({
                message: `LEGAL COMPLIANCE: ${item.name} proves medication is legal and yours. (+5 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'success'
            });
        });
    }

    // 18. Tear Gas Protection (DREDF)
    // If ThreatLevel is High (CS Gas), check for protection.
    if (threatLevel === 'High') {
        const respiratoryProtection = equippedItems.filter(item => item.attributes.isRespirator);
        const eyeProtection = equippedItems.filter(item => item.attributes.blocksChemical);

        if (respiratoryProtection.length > 0) {
            score += 10;
            respiratoryProtection.forEach(item => {
                feedback.push({
                    message: `LUNG PROTECTION: ${item.name} filters particulates including CS gas. (+10 PTS)`,
                    sourceUrl: item.sourceUrl,
                    sourceName: item.sourceName,
                    severity: 'success'
                });
            });
        }

        if (eyeProtection.length > 0) {
            score += 10;
            eyeProtection.forEach(item => {
                feedback.push({
                    message: `EYE SEAL: ${item.name} creates a seal against chemical agents. (+10 PTS)`,
                    sourceUrl: item.sourceUrl,
                    sourceName: item.sourceName,
                    severity: 'success'
                });
            });
        }
    }

    // 19. First Aid Utility
    const firstAidItems = equippedItems.filter(item => item.attributes.isFirstAid);
    if (firstAidItems.length > 0) {
        score += 10;
        firstAidItems.forEach(item => {
            feedback.push({
                message: `MEDIC READY: ${item.name} allows treatment of minor injuries on site. (+10 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'success'
            });
        });
    }

    // 20. Sensory Safety
    const sensoryItems = equippedItems.filter(item => item.attributes.isSensoryAid);
    if (sensoryItems.length > 0) {
        score += 5;
        sensoryItems.forEach(item => {
            feedback.push({
                message: `SENSORY AID: ${item.name} reduces sensory overload in chaotic environments. (+5 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'info'
            });
        });
    }

    // 21. Assistive Tech Power
    const assistivePowerItems = equippedItems.filter(item => item.attributes.supportsAssistiveTech);
    if (assistivePowerItems.length > 0) {
        // Feedback already handled by generic "providesPower", but maybe add specific note?
        // Actually, let's just stick to the generic power feedback to avoid double messaging, 
        // OR add a specific "Assistive Tech" note if it's strictly better?
        // For now, "providesPower" generic rule covers it.
    }

    // 22. Right to Record (WITNESS / First Amendment)
    const documentationItems = equippedItems.filter(item => item.attributes.isDocumentation);
    if (documentationItems.length > 0) {
        score += 5; // Positive for exercising rights
        documentationItems.forEach(item => {
            feedback.push({
                message: `RIGHT TO RECORD: Using ${item.name} to document events is a constitutional right. (+5 PTS)`,
                sourceUrl: 'https://witness.org/how-to-film-a-protest/',
                sourceName: 'WITNESS',
                severity: 'info'
            });
        });

        // 22b. Biometric Risk Check (while filming)
        const bioItems = documentationItems.filter(item => item.attributes.isBiometric);
        if (bioItems.length > 0) {
            score -= 10;
            bioItems.forEach(item => {
                feedback.push({
                    message: `BIOMETRIC RISK: Filming draws attention. ${item.name} (FaceID/TouchID) can be legally compelled to unlock. Disable it.`,
                    sourceUrl: 'https://ssd.eff.org/module/attending-protest',
                    sourceName: 'EFF / WITNESS',
                    severity: 'warning'
                });
            });
        }

        // 22c. Privacy Warning (WITNESS)
        // Check if user has tools to anonymize (Blur app, etc)
        const privacyTools = equippedItems.filter(item => item.attributes.protectsPrivacy);
        if (privacyTools.length === 0) {
            score -= 5;
            feedback.push({
                message: `PRIVACY RISK: Filming without blurring faces endangers other protesters. Use an Image Scrubber or film from safe angles.`,
                sourceUrl: 'https://witness.org/how-to-film-a-protest/',
                sourceName: 'WITNESS',
                severity: 'warning'
            });
        } else {
            privacyTools.forEach(item => {
                feedback.push({
                    message: `ANONYMITY SECURED: ${item.name} helps scrub faces and metadata to protect identities. (+5 PTS)`,
                    sourceUrl: 'https://witness.org/how-to-film-a-protest/',
                    sourceName: 'WITNESS',
                    severity: 'success'
                });
            });
            score += 5;
        }
    }

    // 23. Emergency Contact Info (Physical)
    const emergencyInfoItems = equippedItems.filter(item => item.attributes.hasEmergencyContact);
    if (emergencyInfoItems.length > 0) {
        score += 10;
        emergencyInfoItems.forEach(item => {
            feedback.push({
                message: `LEGAL LIFELINE: ${item.name} ensures legal support can be contacted if your phone is taken/broken. (+10 PTS)`,
                sourceUrl: item.sourceUrl,
                sourceName: item.sourceName,
                severity: 'success'
            });
        });
    }

    // 24. Professional Media Gear (High Profile)
    const pressItems = equippedItems.filter(item => item.attributes.isPress);
    if (pressItems.length > 0) {
        pressItems.forEach(item => {
            feedback.push({
                message: `HIGH VISIBILITY: ${item.name} clearly identifies you as media/observer (+5), but makes you a priority target for police separation (-5).`,
                sourceUrl: 'https://cpj.org/safety-kit/physical-safety-digital-safety/',
                sourceName: 'CPJ',
                severity: 'warning'
            });
        });
    }

    // 25. Identity Exposure (NLG)
    const identifyingItems = equippedItems.filter(item => item.attributes.isIdentifying);
    if (identifyingItems.length > 0 && threatLevel === 'High') {
        score -= 10;
        identifyingItems.forEach(item => {
            feedback.push({
                message: `DATA RISK: Carrying ${item.name} risks confiscation and identification if arrested. (NLG)`,
                sourceUrl: 'https://www.nlg.org/know-your-rights/',
                sourceName: 'NLG',
                severity: 'warning'
            });
        });
    }

    // 26. Legal Safety Net (NLG)
    const legalContactItems = equippedItems.filter(item => item.attributes.hasLegalContact);
    if (legalContactItems.length > 0) {
        score += 10;
        legalContactItems.forEach(item => {
            feedback.push({
                message: `LEGAL SUPPORT: ${item.name} ensures you can call for help if arrested and phone is taken. (+10 PTS)`,
                sourceUrl: 'https://www.nlg.org/know-your-rights/',
                sourceName: 'NLG',
                severity: 'success'
            });
        });
    }

    // 27. Improper PPE (OSHA) - False Sense of Security
    const surgicalMasks = equippedItems.filter(item => item.id === 'item-surgical-mask');
    if (surgicalMasks.length > 0 && isChemicalThreat) {
        score -= 5;
        surgicalMasks.forEach(item => {
            feedback.push({
                message: `FALSE SECURITY: ${item.name} provides NO protection against gas/smoke (it's not a respirator). (-5 PTS)`,
                sourceUrl: 'https://www.osha.gov/respiratory-protection',
                sourceName: 'OSHA',
                severity: 'warning'
            });
        });
    }

    // 28. Impact Protection (OSHA Z87+)
    const impactItems = equippedItems.filter(item => item.attributes.isImpactRated);
    if (impactItems.length > 0 && isKineticThreat) { // Kinetic threats usually high threat police
        score += 10;
        impactItems.forEach(item => {
            feedback.push({
                message: `EYES SHIELDED: ${item.name} (Z87+) protects against impact/projectiles. (+10 PTS)`,
                sourceUrl: 'https://www.osha.gov/eye-face-protection',
                sourceName: 'OSHA',
                severity: 'success'
            });
        });
    }

    // 29. Vapor Seal (OSHA)
    const sealedItems = equippedItems.filter(item => item.attributes.isSealable);
    if (sealedItems.length > 0 && isChemicalThreat) {
        // Upgrade from basic blocksChemical if it seals
        score += 5;
        sealedItems.forEach(item => {
            feedback.push({
                message: `VAPOR SEAL: ${item.name} creates an airtight seal against chemical gas. (+5 PTS)`,
                sourceUrl: 'https://www.osha.gov/eye-face-protection',
                sourceName: 'OSHA',
                severity: 'success'
            });
        });
    }


    // 30. Community Care (Disease Prevention)
    // Any mask counts as source control/community care
    const diseasePreventingItems = equippedItems.filter(item =>
        item.id === 'item-surgical-mask' ||
        item.id === 'item-n95-mask' ||
        item.id === 'item-kn95-mask' ||
        item.tags?.includes('medical')
    );
    // Deduplicate logic if needed, but for now check existence
    if (diseasePreventingItems.length > 0) {
        score += 5;
        // Just one feedback card for the concept
        feedback.push({
            message: `COMMUNITY CARE: Wearing a mask (${diseasePreventingItems[0].name}) helps prevent the spread of disease. (+5 PTS)`,
            sourceUrl: 'https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/types-of-masks.html',
            sourceName: 'CDC',
            severity: 'success'
        });
    }

    // Clamp score
    score = Math.min(100, Math.max(0, score));

    return {
        score,
        feedback
    };
};
