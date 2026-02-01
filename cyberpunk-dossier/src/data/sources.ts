export interface TrustedSource {
    id: string;
    name: string;
    shortName: string;
    url: string;
    topics: string[];
    description: string;
}

export const TRUSTED_SOURCES: TrustedSource[] = [
    {
        id: 'amnesty-safety-toolkit',
        name: 'Amnesty International Safety Toolkit',
        shortName: 'Amnesty International',
        url: 'https://www.amnestyusa.org/pdfs/SafeyDuringProtest_F.pdf',
        topics: ['clothing', 'eye-protection', 'general-safety'],
        description: 'Comprehensive guide covering essential gear, rights, and safety strategies for protests.'
    },
    {
        id: 'nlg-know-your-rights',
        name: 'National Lawyers Guild (NLG)',
        shortName: 'NLG',
        url: 'https://www.nlg.org/know-your-rights/',
        topics: ['legal-rights', 'medical', 'arrest'],
        description: 'Legal support resources explaining your rights during encounters with law enforcement.'
    },
    {
        id: 'eff-surveillance-self-defense',
        name: 'EFF Surveillance Self-Defense',
        shortName: 'EFF',
        url: 'https://ssd.eff.org/module/attending-protest',
        topics: ['digital-security', 'privacy', 'phones'],
        description: 'Expert advice on protecting your digital privacy and data before, during, and after protests.'
    },
    {
        id: 'phr-tear-gas',
        name: 'Physicians for Human Rights (PHR)',
        shortName: 'PHR',
        url: 'https://phr.org/our-work/resources/preparing-for-protecting-against-and-treating-tear-gas-and-other-chemical-irritant-exposure-a-protesters-guide/',
        topics: ['medical', 'tear-gas', 'chemical-exposure'],
        description: 'Medical guidance on protecting against and treating exposure to chemical irritants like tear gas.'
    },
    {
        id: 'aclu-protesters-rights',
        name: 'ACLU Protesters\' Rights',
        shortName: 'ACLU',
        url: 'https://www.aclu.org/know-your-rights/protesters-rights',
        topics: ['general-rights', 'signage', 'speech'],
        description: 'Overview of your First Amendment rights and what to do if they are violated.'
    },
    {
        id: 'cpj-physical-safety',
        name: 'Committee to Protect Journalists (CPJ)',
        shortName: 'CPJ',
        url: 'https://cpj.org/safety-kit/physical-safety-civil-disorder/',
        topics: ['physical-safety', 'media', 'press'],
        description: 'Safety protocols for journalists and media personnel covering civil disorder.'
    },
    {
        id: 'dredf-disability-rights',
        name: 'Sins Invalid / DREDF',
        shortName: 'DREDF',
        url: 'https://dredf.org/2020/06/16/know-your-rights-protesting-while-disabled/',
        topics: ['disability-rights', 'mobility', 'accessibility'],
        description: 'Guidance ensuring safety and accessibility for protesters with disabilities.'
    },
    {
        id: 'nrdc-health',
        name: 'NRDC Health & Safety',
        shortName: 'NRDC',
        url: 'https://www.nrdc.org/stories/how-protest-safely',
        topics: ['health', 'weather', 'hydration'],
        description: 'Practical tips for staying healthy, including hydration and weather protection.'
    },
    {
        id: 'witness-filming',
        name: 'WITNESS',
        shortName: 'WITNESS',
        url: 'https://library.witness.org/product/filming-protests-demonstrations-usa/',
        topics: ['filming', 'evidence', 'ethics'],
        description: 'Best practices for filming protests safely, ethically, and effectively for evidence.'
    }
];

export interface SafetyGuidance {
    topic: string;
    description: string;
    sources: string[];
}

export const GENERAL_SAFETY_GUIDANCE: SafetyGuidance[] = [
    {
        topic: 'Buddy System',
        description: 'Always attend with a trusted partner. Keep an eye on each other and have a plan if separated.',
        sources: ['Amnesty International', 'NLG']
    },
    {
        topic: 'Rally Point',
        description: 'Agree on a meeting location away from the main action to regroup if you get separated or need to leave.',
        sources: ['Amnesty International', 'NRDC']
    },
    {
        topic: 'Exit Routes',
        description: 'Scout multiple escape paths before things get heated. Know how to leave safely if the situation deteriorates.',
        sources: ['DREDF', 'Amnesty International']
    },
    {
        topic: 'OODA Loop',
        description: 'Observe, Orient, Decide, Act. Maintain situational awareness to make quick, informed decisions.',
        sources: ['CPJ']
    },
    {
        topic: 'Legal Observer Contact',
        description: 'Write the National Lawyers Guild (NLG) hotline number on your arm in permanent marker before you go.',
        sources: ['NLG']
    },
    {
        topic: 'Jail Support',
        description: 'Have a plan for who to call if you are arrested. Ensure they have your information and know what to do.',
        sources: ['NLG']
    },
    {
        topic: 'Medical Team Location',
        description: 'Identify where street medics are stationed early on. Know where to go for help.',
        sources: ['Street Medic Resources']
    },
    {
        topic: 'De-escalation',
        description: 'Recognize signs of escalation. Stay calm and disengage if a situation becomes unsafe.',
        sources: ['Multiple']
    }
];
