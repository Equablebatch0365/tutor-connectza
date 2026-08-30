// src/context/LanguageContext.tsx
import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

// Supported languages
export type Language = 'en' | 'af' | 'zu';

// Translation structure
interface Translations {
    // Navbar
    home: string;
    findTutor: string;
    resources: string;
    dashboard: string;
    logout: string;
    signUp: string;
    logIn: string;

    // Login Page
    selectRole: string;
    learner: string;
    tutor: string;
    email: string;
    password: string;
    loginBtn: string;
    noAccount: string;

    // Register Page
    createAccount: string;
    chooseRole: string;
    iAmLearner: string;
    iAmTutor: string;
    fullName: string;
    createPassword: string;
    currentGrade: string;
    selectGrade: string;
    grade10: string;
    grade11: string;
    grade12: string;
    province: string;
    selectProvince: string;
    subjectsTeach: string;
    yearsExp: string;
    signUpLearner: string;
    signUpTutor: string;
    alreadyAccount: string;

    // Home Page
    unlockTitle: string;
    unlockSubtitle: string;
    joinWaitlist: string;
    exploreSubjects: string;
    beFirst: string;
    joinDescription: string;
    enterEmail: string;
    thankYou: string;
    subjectsMatter: string;
    subjectsSubtitle: string;
    whatBuilding: string;
    gatewayMastery: string;
    gatewayMasteryDesc: string;
    affordableDesign: string;
    affordableDesignDesc: string;
    dataLight: string;
    dataLightDesc: string;

    // Find a Tutor Page
    findTutorTitle: string;
    searchSubject: string;
    allProvinces: string;
    requestSession: string;
    preferredDate: string;
    preferredTime: string;
    helpWith: string;
    confirmRequest: string;
    cancel: string;
    requestSent: string;
    requestSentDesc: string;
    close: string;
    noTutorsFound: string;

    // Resources Page
    resourcesTitle: string;
    resourcesSubtitle: string;
    downloadPDF: string;
    officialSource: string;

    // Learner Dashboard
    hi: string;
    mySessions: string;
    noSessionsBooked: string;
    findTutorBtn: string;
    subjectProgress: string;
    progressDesc: string;
    tutorLabel: string;
    dateLabel: string;
    messageLabel: string;
    statusLabel: string;
    waitingTutor: string;
    accepted: string;
    declined: string;
    chatWhatsApp: string;
    joinMeeting: string;
}

// Actual translations
const translations: Record<Language, Translations> = {
    en: {
        home: 'Home',
        findTutor: 'Find a Tutor',
        resources: 'Resources',
        dashboard: 'My Dashboard',
        logout: 'Log Out',
        signUp: 'Sign Up',
        logIn: 'Log In',

        // Login
        selectRole: 'Select your role to continue.',
        learner: 'Learner',
        tutor: 'Tutor',
        email: 'Email Address',
        password: 'Password',
        loginBtn: 'Log In',
        noAccount: "Don't have an account?",

        // Register
        createAccount: 'Create your account',
        chooseRole: 'Choose your role to get started.',
        iAmLearner: 'I am a Learner',
        iAmTutor: 'I am a Tutor',
        fullName: 'Full Name',
        createPassword: 'Create a password',
        currentGrade: 'Current Grade',
        selectGrade: 'Select Grade',
        grade10: 'Grade 10',
        grade11: 'Grade 11',
        grade12: 'Grade 12 (Matric)',
        province: 'Province',
        selectProvince: 'Select Province',
        subjectsTeach: 'Subjects you can teach',
        yearsExp: 'Years of Experience',
        signUpLearner: 'Sign Up as Learner',
        signUpTutor: 'Sign Up as Tutor',
        alreadyAccount: 'Already have an account?',

        // Home
        unlockTitle: 'Unlock Your University Entrance.',
        unlockSubtitle: 'Over 700,000 students qualified for tertiary study last year, but hundreds of thousands were turned away. We are building an affordable, localized platform to help you ace the critical gateway subjects.',
        joinWaitlist: 'Join the Waitlist',
        exploreSubjects: 'Explore Subjects',
        beFirst: 'Be the first to know.',
        joinDescription: 'Join our waitlist to get early access when we launch.',
        enterEmail: 'Enter your email address',
        thankYou: "You're on the list!",
        subjectsMatter: 'The Subjects That Matter',
        subjectsSubtitle: 'Mastering these opens the doors to Engineering, Medicine, Commerce, and Law.',
        whatBuilding: 'What we are building for you',
        gatewayMastery: 'Gateway Subject Mastery',
        gatewayMasteryDesc: 'Focused tools for the subjects that gatekeep university entrance.',
        affordableDesign: 'Affordable by Design',
        affordableDesignDesc: 'Cutting out the R300+/hour overhead to make quality academic support accessible.',
        dataLight: 'Data-Light & Local',
        dataLightDesc: 'Built for South Africa. Low data usage, mobile-first, and support for 11 languages.',

        // Find a Tutor
        findTutorTitle: 'Find Your Tutor',
        searchSubject: 'Search by subject (e.g. Pure Maths)',
        allProvinces: 'All Provinces',
        requestSession: 'Request Session',
        preferredDate: 'Preferred Date',
        preferredTime: 'Preferred Time',
        helpWith: 'What do you need help with?',
        confirmRequest: 'Confirm Request',
        cancel: 'Cancel',
        requestSent: 'Request Sent!',
        requestSentDesc: 'Your session request has been sent successfully.',
        close: 'Close',
        noTutorsFound: 'No tutors found for your search. Try another subject or province.',

        // Resources
        resourcesTitle: 'Data-Light Learning Library',
        resourcesSubtitle: 'Browse official past papers and summaries from the DBE and WCED. The app uses almost no data to browse; only download when you have data.',
        downloadPDF: 'Download PDF (Uses Data)',
        officialSource: 'Official Source',

        // Learner Dashboard
        hi: 'Hi',
        mySessions: 'My Sessions',
        noSessionsBooked: 'No sessions booked yet. Book a tutor to get started!',
        findTutorBtn: 'Find a Tutor',
        subjectProgress: 'Subject Progress',
        progressDesc: 'Track your progress here once you start sessions.',
        tutorLabel: 'Tutor',
        dateLabel: 'Date',
        messageLabel: 'Message',
        statusLabel: 'Status',
        waitingTutor: 'Waiting for Tutor',
        accepted: 'Accepted',
        declined: 'Declined',
        chatWhatsApp: 'Chat on WhatsApp',
        joinMeeting: 'Join Meeting',
    },
    af: {
        home: 'Tuis',
        findTutor: 'Vind `n Tutor',
        resources: 'Hulpbronne',
        dashboard: 'My Dashboard',
        logout: 'Teken Uit',
        signUp: 'Teken Aan',
        logIn: 'Meld Aan',

        // Login
        selectRole: 'Kies jou rol om voort te gaan.',
        learner: 'Leerder',
        tutor: 'Tutor',
        email: 'E-posadres',
        password: 'Wagwoord',
        loginBtn: 'Meld Aan',
        noAccount: "Het jy nie `n rekening nie?",

        // Register
        createAccount: 'Skep jou rekening',
        chooseRole: 'Kies jou rol om te begin.',
        iAmLearner: 'Ek is `n Leerder',
        iAmTutor: 'Ek is `n Tutor',
        fullName: 'Volle Naam',
        createPassword: 'Skep `n wagwoord',
        currentGrade: 'Huidige Graad',
        selectGrade: 'Kies Graad',
        grade10: 'Graad 10',
        grade11: 'Graad 11',
        grade12: 'Graad 12 (Matriek)',
        province: 'Provinsie',
        selectProvince: 'Kies Provinsie',
        subjectsTeach: 'Vakke wat jy kan onderrig',
        yearsExp: 'Jare Ondervinding',
        signUpLearner: 'Teken aan as Leerder',
        signUpTutor: 'Teken aan as Tutor',
        alreadyAccount: 'Reeds `n rekening?',

        // Home
        unlockTitle: 'Ontgrendel jou Universiteitstoelating.',
        unlockSubtitle: 'Meer as 700,000 studente het verlede jaar vir tersiêre studie gekwalifiseer, maar honderde duisende is van die hand gewys. Ons bou `n bekostigbare, gelokaliseerde platform om jou te help om die kritieke onderwerpe te bemeester.',
        joinWaitlist: 'Sluit by die Waglys aan',
        exploreSubjects: 'Verken Onderwerpe',
        beFirst: 'Wees die eerste om te weet.',
        joinDescription: 'Sluit by ons waglys aan om vroeë toegang te kry wanneer ons bekendstel.',
        enterEmail: 'Voer jou e-posadres in',
        thankYou: "Jy is op die lys!",
        subjectsMatter: 'Die Onderwerpe wat Saak Maak',
        subjectsSubtitle: 'Om hierdie te bemeester open die deure na Ingenieurswese, Geneeskunde, Handel en Regte.',
        whatBuilding: 'Wat ons vir jou bou',
        gatewayMastery: 'Poort Onderwerp Meesterskap',
        gatewayMasteryDesc: 'Gefokusde gereedskap vir die onderwerpe wat universiteitstoelating beheer.',
        affordableDesign: 'Bekostigbaar deur Ontwerp',
        affordableDesignDesc: 'Sny die R300+/uur oorhoofse koste om kwaliteit akademiese ondersteuning toeganklik te maak.',
        dataLight: 'Data-Lig & Plaaslik',
        dataLightDesc: 'Gebou vir Suid-Afrika. Lae dataverbruik, mobiel-eerste, en ondersteuning vir 11 tale.',

        // Find a Tutor
        findTutorTitle: 'Vind Jou Tutor',
        searchSubject: 'Soek per vak (bv. Wiskunde)',
        allProvinces: 'Alle Provinsies',
        requestSession: 'Versoek Sessie',
        preferredDate: 'Voorkeur Datum',
        preferredTime: 'Voorkeur Tyd',
        helpWith: 'Waarmee benodig jy hulp?',
        confirmRequest: 'Bevestig Versoek',
        cancel: 'Kanselleer',
        requestSent: 'Versoek Gestuur!',
        requestSentDesc: 'Jou sessieversoek is suksesvol gestuur.',
        close: 'Maak toe',
        noTutorsFound: 'Geen tutors gevind vir jou soektog nie. Probeer `n ander vak of provinsie.',

        // Resources
        resourcesTitle: 'Data-Lig Leerbiblioteek',
        resourcesSubtitle: 'Blaai deur amptelike vorige vraestelle en opsommings van die DBE en WCED. Die app gebruik amper geen data om te blaai nie; laai net af wanneer jy data het.',
        downloadPDF: 'Laai PDF Af (Gebruik Data)',
        officialSource: 'Amptelike Bron',

        // Learner Dashboard
        hi: 'Hallo',
        mySessions: 'My Sessies',
        noSessionsBooked: 'Geen sessies bespreek nie. Bespreek `n tutor om te begin!',
        findTutorBtn: 'Vind `n Tutor',
        subjectProgress: 'Vak Vordering',
        progressDesc: 'Volg jou vordering hier sodra jy met sessies begin.',
        tutorLabel: 'Tutor',
        dateLabel: 'Datum',
        messageLabel: 'Boodskap',
        statusLabel: 'Status',
        waitingTutor: 'Wag vir Tutor',
        accepted: 'Aanvaar',
        declined: 'Geweier',
        chatWhatsApp: 'Gesels op WhatsApp',
        joinMeeting: 'Sluit aan by Vergadering',
    },
    zu: {
        home: 'Ikhaya',
        findTutor: 'Thola Umfundisi',
        resources: 'Izinsiza',
        dashboard: 'I-Dashboard Yami',
        logout: 'Phuma',
        signUp: 'Bhalisa',
        logIn: 'Ngena',

        // Login
        selectRole: 'Khetha indima yakho ukuze uqhubeke.',
        learner: 'Umfundi',
        tutor: 'Umfundisi',
        email: 'Ikheli le-imeyili',
        password: 'Iphasiwedi',
        loginBtn: 'Ngena',
        noAccount: 'Awenayo i-akhawunti?',

        // Register
        createAccount: 'Dala i-akhawunti yakho',
        chooseRole: 'Khetha indima yakho ukuze uqale.',
        iAmLearner: 'Ngiy Umfundi',
        iAmTutor: 'Ngiy Umfundisi',
        fullName: 'Igama Eliphelele',
        createPassword: 'Dala iphasiwedi',
        currentGrade: 'Ibanga Lamanje',
        selectGrade: 'Khetha Ibanga',
        grade10: 'Ibanga 10',
        grade11: 'Ibanga 11',
        grade12: 'Ibanga 12 (Matric)',
        province: 'Isifundazwe',
        selectProvince: 'Khetha Isifundazwe',
        subjectsTeach: 'Izifundo ozifundisayo',
        yearsExp: 'Iminyaka Yesipiliyoni',
        signUpLearner: 'Bhalisa njengo Mfundi',
        signUpTutor: 'Bhalisa njengo Mfundisi',
        alreadyAccount: 'Usuvele une-akhawunti?',

        // Home
        unlockTitle: 'Vula Ukungena Kwakho Eyunivesithi.',
        unlockSubtitle: 'Bafundi abangaphezu kuka-700,000 bafanelekele izifundo zemfundo ephakeme nyakenye, kodwa amakhulu ezinkulungwane acishwa. Sakha inkundla efinyelelekayo, yendawo ukukusiza uqonde izifundo ezibalulekile.',
        joinWaitlist: 'Joyina Uhlu Lokulinda',
        exploreSubjects: 'Hlola Izifundo',
        beFirst: 'Yiba ngowokuqala ukwazi.',
        joinDescription: 'Joyina uhlu lwethu lokulinda ukuze uthole ukufinyelela kwangaphambi kokuthi sisungule.',
        enterEmail: 'Faka ikheli lakho le-imeyili',
        thankYou: "Usoluhlu!",
        subjectsMatter: 'Izifundo Ezibalulekile',
        subjectsSubtitle: 'Ukuqonda lezi kuvula iminyango yezobunjiniyela, ezokwelapha, ezebhizinisi, nezomthetho.',
        whatBuilding: 'Okukwakhela wena',
        gatewayMastery: 'Ukugcizelela Izifundo Ezibalulekile',
        gatewayMasteryDesc: 'Amathuluzi agxile ezifundweni ezivula amasango eyunivesithi.',
        affordableDesign: 'Kuyafinyeleleka Ngokwakhiwa',
        affordableDesignDesc: 'Ukunciphisa izindleko eziphakeme zama-R300+/ihora ukuze kufinyeleleke kusizo lwezemfundo olusezingeni eliphezulu.',
        dataLight: 'Kuncane Idatha & Yasendaweni',
        dataLightDesc: 'Yakhelwe iNingizimu Afrika. Ukusetshenziswa kwedatha okuphansi, okokuqala imobile, nokusekela izilimi eziyi-11.',

        // Find a Tutor
        findTutorTitle: 'Thola Umfundisi Wakho',
        searchSubject: 'Sesha ngesifundo (isb. Izibalo)',
        allProvinces: 'Zonke Izifundazwe',
        requestSession: 'Cela Iseshini',
        preferredDate: 'Usuku Olikhethayo',
        preferredTime: 'Isikhathi Okhetha Sonke',
        helpWith: 'Yini odinga usizo ngayo?',
        confirmRequest: 'Qinisekisa Isicelo',
        cancel: 'Khansela',
        requestSent: 'Isicelo Sithunyelwe!',
        requestSentDesc: 'Isicelo sakho seseshini sithunyelwe ngempumelelo.',
        close: 'Vala',
        noTutorsFound: 'Abafundisi abatholakalanga okuseshayo. Zama esinye isifundo noma isifundazwe.',

        // Resources
        resourcesTitle: 'Umtapo Wolwazi Wokufunda Oncane',
        resourcesSubtitle: 'Browza amaphepha wokuhlola asemthethweni nezifinyezo ezivela ku-DBE ne-WCED. Uhlelo lusebenzisa idatha encane kakhulu ukubrowza; landa kuphela uma unedatha.',
        downloadPDF: 'Landa i-PDF (Kusetshenziswa Idatha)',
        officialSource: 'Umthombo Osemthethweni',

        // Learner Dashboard
        hi: 'Sawubona',
        mySessions: 'Izikhathi Zami Zokufunda',
        noSessionsBooked: 'Azikho izikhathi zokufunda ozibhukile. Bhuka umfundisi ukuze uqale!',
        findTutorBtn: 'Thola Umfundisi',
        subjectProgress: 'Intuthuko Yezifundo',
        progressDesc: 'Landelela intuthuko yakho lapha uma uqala izikhathi zokufunda.',
        tutorLabel: 'Umfundisi',
        dateLabel: 'Usuku',
        messageLabel: 'Umlayezo',
        statusLabel: 'Isimo',
        waitingTutor: 'Ulinde Umfundisi',
        accepted: 'Yamukelwe',
        declined: 'Yenqatshwa',
        chatWhatsApp: 'Xhumana nge-WhatsApp',
        joinMeeting: 'Joyina Umhlangano',
    },
};

// Define the context type
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

// CREATE the context
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const value = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}