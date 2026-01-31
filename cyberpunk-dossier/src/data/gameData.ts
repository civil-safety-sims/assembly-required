import type { ItemType } from '../types';

export interface SafetyItemAttributes {
    isFlammable: boolean;
    isBiometric: boolean;
    isAbsorbent: boolean;
    isSterile: boolean;
    requiresPrescription: boolean;
    isLoosePills: boolean;
}

export interface SafetyItem {
    id: string;
    name: string;
    icon: string; // Lucide icon name
    slot: ItemType;
    sourceUrl: string;
    sourceName: string;
    attributes: SafetyItemAttributes;
}

const DEFAULT_ATTRIBUTES: SafetyItemAttributes = {
    isFlammable: false,
    isBiometric: false,
    isAbsorbent: false,
    isSterile: false,
    requiresPrescription: false,
    isLoosePills: false,
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
            isAbsorbent: false,
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
];
