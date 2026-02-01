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
];
