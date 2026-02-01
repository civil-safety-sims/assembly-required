import type { ItemType } from '../types';

export interface SafetyItemAttributes {
    isFlammable: boolean;
    isBiometric: boolean;
    isAbsorbent: boolean;
    isSterile: boolean;
    requiresPrescription: boolean;
    isLoosePills: boolean;
    isSignalBlocking: boolean;
    isAnonymous: boolean;
    hasEncryptedComms: boolean;
    providesOfflineNav: boolean;
    // New attributes from MADR
    isOilBased: boolean;
    isOpenToed: boolean;
    providesHydration: boolean;
    providesWarmth: boolean;
    providesEnergy: boolean;
    providesSunProtection: boolean;
    // New attributes from NRDC
    providesWaterResistance: boolean;
    providesPower: boolean;
    isUntraceable: boolean;
    providesResource: boolean;
    // New attributes from DREDF
    blocksChemical: boolean;
    isRespirator: boolean;
    isFirstAid: boolean;
    isSensoryAid: boolean;
    supportsAssistiveTech: boolean;
    // New attributes from WITNESS
    isDocumentation: boolean;
    hasEmergencyContact: boolean;
    isPress: boolean; // Professional visibility
    protectsPrivacy: boolean; // Blurs faces/scrubs metadata
}

export interface SafetyItem {
    id: string;
    name: string;
    icon: string; // Lucide icon name
    slot: ItemType;
    sourceUrl: string;
    sourceName: string;
    attributes: SafetyItemAttributes;
    tags?: string[];
}

const DEFAULT_ATTRIBUTES: SafetyItemAttributes = {
    isFlammable: false,
    isBiometric: false,
    isAbsorbent: false,
    isSterile: false,
    requiresPrescription: false,
    isLoosePills: false,
    isSignalBlocking: false,
    isAnonymous: false,
    hasEncryptedComms: false,
    providesOfflineNav: false,
    isOilBased: false,
    isOpenToed: false,
    providesHydration: false,
    providesWarmth: false,
    providesEnergy: false,
    providesSunProtection: false,
    providesWaterResistance: false,
    providesPower: false,
    isUntraceable: false,
    providesResource: false,
    blocksChemical: false,
    isRespirator: false,
    isFirstAid: false,
    isSensoryAid: false,
    supportsAssistiveTech: false,
    isDocumentation: false,
    hasEmergencyContact: false,
    isPress: false,
    protectsPrivacy: false,
};

export const AVAILABLE_ITEMS: SafetyItem[] = [
    {
        id: 'item-polyester-hoodie',
        name: 'Polyester Hoodie',
        icon: 'Shirt',
        slot: 'body',
        sourceUrl: 'https://www.amnestyusa.org/pdfs/SafeyDuringProtest_F.pdf',
        sourceName: 'Amnesty International Safety Toolkit',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isFlammable: true,
        },
    },
    {
        id: 'item-cotton-flannel',
        name: 'Cotton Flannel',
        icon: 'Shirt',
        slot: 'body',
        sourceUrl: 'https://www.amnestyusa.org/pdfs/SafeyDuringProtest_F.pdf',
        sourceName: 'Amnesty International Safety Toolkit',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isFlammable: false,
        },
    },
    {
        id: 'item-tampons',
        name: 'Tampons',
        icon: 'Package', // Generic package icon
        slot: 'pockets',
        sourceUrl: 'https://www.nlg.org/know-your-rights/',
        sourceName: 'National Lawyers Guild',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isAbsorbent: true,
        },
    },
    {
        id: 'item-pads',
        name: 'Menstrual Pads',
        icon: 'Package',
        slot: 'pockets',
        sourceUrl: 'https://www.nlg.org/know-your-rights/',
        sourceName: 'National Lawyers Guild',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isAbsorbent: true,
        },
    },
    {
        id: 'item-smartphone-faceid',
        name: 'Smart Phone (FaceID On)',
        icon: 'Smartphone',
        slot: 'hands',
        sourceUrl: 'https://ssd.eff.org/module/attending-protest',
        sourceName: 'EFF Surveillance Self-Defense',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isBiometric: true,
            isDocumentation: true, // Capability to record
        },
        tags: ['comms'],
    },
    {
        id: 'item-smartphone-secure',
        name: 'Smart Phone (Signal + No Track)',
        icon: 'Smartphone',
        slot: 'hands',
        sourceUrl: 'https://ssd.eff.org/module/attending-protest',
        sourceName: 'EFF Surveillance Self-Defense',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            hasEncryptedComms: true,
            isDocumentation: true,
        },
        tags: ['comms'],
    },
    {
        id: 'item-burner-phone',
        name: 'Prepaid Burner Phone',
        icon: 'Phone',
        slot: 'hands',
        sourceUrl: 'https://ssd.eff.org/module/attending-protest#buy-a-prepaid-disposable-phone',
        sourceName: 'EFF Surveillance Self-Defense',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isAnonymous: true,
            isDocumentation: true,
        },
        tags: ['comms'],
    },
    {
        id: 'item-faraday-bag',
        name: 'Faraday Bag',
        icon: 'Shield',
        slot: 'pockets',
        sourceUrl: 'https://ssd.eff.org/module/attending-protest#prevent-cell-site-simulators-from-tracking-your-phone',
        sourceName: 'EFF Surveillance Self-Defense',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isSignalBlocking: true,
        },
        tags: ['comms', 'security'],
    },
    {
        id: 'item-paper-map',
        name: 'Offline Area Map',
        icon: 'Map',
        slot: 'pockets',
        sourceUrl: 'https://ssd.eff.org/module/attending-protest#things-to-be-aware-of-while-traveling-to-and-from-the-protest',
        sourceName: 'EFF Surveillance Self-Defense',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            providesOfflineNav: true,
        },
        tags: ['nav'],
    },
    {
        id: 'item-loose-meds',
        name: 'Loose Meds',
        icon: 'Pill',
        slot: 'pockets',
        sourceUrl: 'https://www.nlg.org/know-your-rights/',
        sourceName: 'National Lawyers Guild',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isLoosePills: true,
        },
    },
    {
        id: 'item-water-bottle',
        name: 'Water Bottle',
        icon: 'Droplets',
        slot: 'hands',
        sourceUrl: 'https://phr.org/our-work/resources/preparing-for-protecting-against-and-treating-tear-gas-and-other-chemical-irritant-exposure-a-protesters-guide/',
        sourceName: 'Physicians for Human Rights',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isSterile: true,
            providesHydration: true,
        },
    },
    {
        id: 'item-contact-lenses',
        name: 'Contact Lenses',
        icon: 'Eye',
        slot: 'eyes',
        sourceUrl: 'https://www.amnestyusa.org/pdfs/SafeyDuringProtest_F.pdf',
        sourceName: 'Amnesty International Safety Toolkit',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isSterile: false, // Traps chemicals
        },
    },
    {
        id: 'item-cardboard-sign',
        name: 'Cardboard Sign',
        icon: 'Square',
        slot: 'hands',
        sourceUrl: 'https://www.aclu.org/know-your-rights/protesters-rights', // General toolkit ref
        sourceName: 'ACLU',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isFlammable: true,
        },
        tags: ['signs'],
    },
    {
        id: 'item-foam-core-sign',
        name: 'Foam Core Sign',
        icon: 'Square',
        slot: 'hands',
        sourceUrl: 'https://www.aclu.org/know-your-rights/protesters-rights',
        sourceName: 'ACLU',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isFlammable: true, // Highly flammable polystyrene
        },
        tags: ['signs'],
    },
    {
        id: 'item-poster-board-sign',
        name: 'Poster Board Sign',
        icon: 'Square',
        slot: 'hands',
        sourceUrl: 'https://www.aclu.org/know-your-rights/protesters-rights',
        sourceName: 'ACLU',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isFlammable: true,
        },
        tags: ['signs'],
    },
    {
        id: 'item-digital-camera',
        name: 'Point & Shoot Camera',
        icon: 'Camera',
        slot: 'hands',
        sourceUrl: 'https://witness.org/how-to-film-a-protest/',
        sourceName: 'WITNESS',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isDocumentation: true,
            isPress: false, // Low profile
        },
        tags: ['comms', 'documentation'],
    },
    {
        id: 'item-pro-camera',
        name: 'Pro DSLR Camera',
        icon: 'Camera',
        slot: 'hands', // Or neck? Hands is fine.
        sourceUrl: 'https://cpj.org/safety-kit/physical-safety-digital-safety/',
        sourceName: 'CPJ / WITNESS',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isDocumentation: true,
            isPress: true, // High profile
        },
        tags: ['comms', 'press'],
    },
    // MADR New Items
    {
        id: 'item-oil-sunscreen',
        name: 'Oil-Based Sunscreen',
        icon: 'Sun',
        slot: 'pockets',
        sourceUrl: 'https://mutualaiddisasterrelief.org/wp-content/uploads/2020/04/kupdf.net_street-medic-handbook.pdf',
        sourceName: 'mutual-aid-disaster-relief',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isOilBased: true,
            providesSunProtection: true,
        },
    },
    {
        id: 'item-water-sunscreen',
        name: 'Water-Based Sunscreen',
        icon: 'Sun',
        slot: 'pockets',
        sourceUrl: 'https://mutualaiddisasterrelief.org/wp-content/uploads/2020/04/kupdf.net_street-medic-handbook.pdf',
        sourceName: 'mutual-aid-disaster-relief',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            providesSunProtection: true,
        },
    },
    {
        id: 'item-flip-flops',
        name: 'Flip Flops',
        icon: 'Footprints',
        slot: 'feet',
        sourceUrl: 'https://mutualaiddisasterrelief.org/wp-content/uploads/2020/04/kupdf.net_street-medic-handbook.pdf',
        sourceName: 'mutual-aid-disaster-relief',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isOpenToed: true,
        },
    },
    {
        id: 'item-electrolytes',
        name: 'Electrolyte Packets',
        icon: 'Zap',
        slot: 'pockets',
        sourceUrl: 'https://mutualaiddisasterrelief.org/wp-content/uploads/2020/04/kupdf.net_street-medic-handbook.pdf',
        sourceName: 'mutual-aid-disaster-relief',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            providesHydration: true,
            providesEnergy: true,
        },
    },
    {
        id: 'item-hand-warmers',
        name: 'Hand Warmers',
        icon: 'ThermometerSun',
        slot: 'pockets',
        sourceUrl: 'https://mutualaiddisasterrelief.org/wp-content/uploads/2020/04/kupdf.net_street-medic-handbook.pdf',
        sourceName: 'mutual-aid-disaster-relief',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            providesWarmth: true,
        },
    },
    {
        id: 'item-trail-mix',
        name: 'Trail Mix',
        icon: 'Nut',
        slot: 'pockets',
        sourceUrl: 'https://mutualaiddisasterrelief.org/wp-content/uploads/2020/04/kupdf.net_street-medic-handbook.pdf',
        sourceName: 'mutual-aid-disaster-relief',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            providesEnergy: true,
        },
    },
    // NRDC New Items
    {
        id: 'item-rain-poncho',
        name: 'Rain Poncho',
        icon: 'Umbrella',
        slot: 'body',
        sourceUrl: 'https://www.nrdc.org/stories/how-protest-safely',
        sourceName: 'NRDC Health & Safety',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            providesWaterResistance: true,
        },
        tags: ['clothing', 'weather'],
    },
    {
        id: 'item-portable-charger',
        name: 'Portable Charger',
        icon: 'BatteryCharging',
        slot: 'pockets',
        sourceUrl: 'https://www.nrdc.org/stories/how-protest-safely',
        sourceName: 'NRDC Health & Safety',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            providesPower: true,
            supportsAssistiveTech: true,
        },
        tags: ['tech', 'utility', 'accessibility'],
    },
    {
        id: 'item-prescription-meds',
        name: 'Meds (Original Bottle)',
        icon: 'Pill',
        slot: 'pockets',
        sourceUrl: 'https://www.nrdc.org/stories/how-protest-safely',
        sourceName: 'NRDC Health & Safety',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            requiresPrescription: true,
        },
        tags: ['medical'],
    },
    {
        id: 'item-cash',
        name: 'Cash',
        icon: 'Banknote',
        slot: 'pockets',
        sourceUrl: 'https://www.nrdc.org/stories/how-protest-safely',
        sourceName: 'NRDC Health & Safety',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isUntraceable: true,
            providesResource: true,
        },
        tags: ['utility'],
    },
    {
        id: 'item-winter-coat',
        name: 'Waterproof Winter Coat',
        icon: 'Snowflake',
        slot: 'body',
        sourceUrl: 'https://www.nrdc.org/stories/how-protest-safely',
        sourceName: 'NRDC Health & Safety',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            providesWaterResistance: true,
            providesWarmth: true,
        },
        tags: ['clothing', 'weather'],
    },
    // DREDF New Items
    {
        id: 'item-ear-plugs',
        name: 'Ear Plugs',
        icon: 'Ear',
        slot: 'head',
        sourceUrl: 'https://dredf.org/know-your-rights-for-disabled-protestors-guide/',
        sourceName: 'DREDF',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isSensoryAid: true,
        },
        tags: ['accessibility', 'sensory'],
    },
    {
        id: 'item-sunglasses',
        name: 'Sunglasses',
        icon: 'Glasses',
        slot: 'eyes',
        sourceUrl: 'https://dredf.org/know-your-rights-for-disabled-protestors-guide/',
        sourceName: 'DREDF',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isSensoryAid: true,
        },
        tags: ['accessibility', 'sensory'],
    },
    {
        id: 'item-sealed-goggles',
        name: 'Sealed Goggles',
        icon: 'Goggles', // Mapped to Lucide icon later
        slot: 'eyes',
        sourceUrl: 'https://dredf.org/know-your-rights-for-disabled-protestors-guide/',
        sourceName: 'DREDF',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            blocksChemical: true,
        },
        tags: ['protective', 'chemical'],
    },
    {
        id: 'item-n95-mask',
        name: 'N95 Mask',
        icon: 'Mask', // Mapped to Lucide icon later (maybe Shield/Mask?)
        slot: 'face',
        sourceUrl: 'https://dredf.org/know-your-rights-for-disabled-protestors-guide/',
        sourceName: 'DREDF',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isRespirator: true,
        },
        tags: ['protective', 'chemical', 'medical'],
    },
    {
        id: 'item-first-aid-kit',
        name: 'First Aid Kit',
        icon: 'BriefcaseMedical',
        slot: 'pockets',
        sourceUrl: 'https://dredf.org/know-your-rights-for-disabled-protestors-guide/',
        sourceName: 'DREDF',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            isFirstAid: true,
            isSterile: true,
        },
        tags: ['medical'],
    },
    {
        id: 'item-image-scrubber',
        name: 'Image Scrubber App',
        icon: 'EyeOff',
        slot: 'pockets', // Installed on phone really, but pockets checks out as "equipped"
        sourceUrl: 'https://witness.org/how-to-film-a-protest/',
        sourceName: 'WITNESS',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            protectsPrivacy: true,
        },
        tags: ['tech', 'privacy'],
    },
    {
        id: 'item-image-scrubber',
        name: 'Image Scrubber App',
        icon: 'EyeOff',
        slot: 'pockets', // Installed on phone really, but pockets checks out as "equipped"
        sourceUrl: 'https://witness.org/how-to-film-a-protest/',
        sourceName: 'WITNESS',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            protectsPrivacy: true,
        },
        tags: ['tech', 'privacy'],
    },
    // WITNESS New Items
    {
        id: 'item-emergency-info',
        name: 'Emergency Info (Body Written)',
        icon: 'Edit2', // Marker/Pen
        slot: 'body', // "Written on body" -> body slot makes sense? Or arms/hands? Body is fine.
        sourceUrl: 'https://witness.org/how-to-film-a-protest/',
        sourceName: 'WITNESS',
        attributes: {
            ...DEFAULT_ATTRIBUTES,
            hasEmergencyContact: true,
        },
        tags: ['legal', 'safety'],
    },
];
