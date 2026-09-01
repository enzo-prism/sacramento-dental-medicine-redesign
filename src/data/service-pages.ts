export type ServicePage = {
  slug: string;
  title: string;
  navLabel: string;
  eyebrow: string;
  description: string;
  intro: string;
  benefits: string[];
  steps: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "our-services",
    title: "Dental Services in Sacramento & Antelope, CA",
    navLabel: "Dental services",
    eyebrow: "Complete dental care",
    description:
      "Explore preventive, cosmetic, restorative, orthodontic, and oral surgery services at Sacramento Dental Medicine in Antelope, CA.",
    intro:
      "From preventive visits to rebuilding or replacing a tooth, Sacramento Dental Medicine brings a broad range of care into one familiar office. Start with an exam and a clear conversation about what matters to you, then build the treatment plan from there.",
    benefits: [
      "Preventive exams, cleanings, and gum care",
      "Cosmetic dentistry and clear aligners",
      "Crowns, implants, and root canal care",
      "Extractions and oral surgery planning",
    ],
    steps: [
      {
        title: "Start with your priorities",
        body: "Tell the team what brought you in, what has been difficult before, and what you want to change.",
      },
      {
        title: "See the complete picture",
        body: "An exam and appropriate imaging help the dentist identify urgent needs and longer-term opportunities.",
      },
      {
        title: "Choose the next step",
        body: "You receive a clear explanation and can sequence care around health, comfort, and your schedule.",
      },
    ],
    faqs: [
      {
        question: "Are you accepting new dental patients?",
        answer:
          "Yes. Sacramento Dental Medicine welcomes new patients of all ages from Antelope and the greater Sacramento area.",
      },
      {
        question: "Can I start with an exam before deciding on treatment?",
        answer:
          "Yes. An exam is the right place to understand what is happening, review options, and decide what you want to do next.",
      },
    ],
    relatedSlugs: ["dental-crowns", "invisalign", "tooth-extractions"],
  },
  {
    slug: "dental-crowns",
    title: "Dental Crowns in Sacramento & Antelope, CA",
    navLabel: "Dental crowns",
    eyebrow: "Restorative dentistry",
    description:
      "Repair a damaged tooth with a custom dental crown at Sacramento Dental Medicine in Antelope, serving the greater Sacramento area.",
    intro:
      "A crown protects and rebuilds a tooth that has been weakened by a fracture, decay, a large filling, or root canal treatment. The team will examine the tooth, explain the options, and plan a restoration that supports comfortable everyday chewing.",
    benefits: [
      "Protect a cracked or weakened tooth",
      "Restore comfortable chewing and function",
      "Rebuild shape after significant damage",
      "Create a natural-looking result",
    ],
    steps: [
      {
        title: "Examine the tooth",
        body: "The visit starts with an exam and any imaging needed to understand the tooth, root, and surrounding bone.",
      },
      {
        title: "Review the plan",
        body: "You will see what the team found and hear the treatment choices before deciding how to proceed.",
      },
      {
        title: "Restore the tooth",
        body: "The tooth is prepared and restored with a crown designed for strength, fit, and a natural appearance.",
      },
    ],
    faqs: [
      {
        question: "How do I know if I need a dental crown?",
        answer:
          "A crown may be recommended when a tooth is cracked, badly worn, heavily filled, or too damaged for a filling alone. An exam is the only way to know which treatment fits the tooth.",
      },
      {
        question: "Can a crown help a broken tooth?",
        answer:
          "Often, yes. Whether the tooth can be restored depends on how much healthy structure remains and the condition of the root and surrounding bone.",
      },
    ],
    relatedSlugs: ["dental-implants", "tooth-extractions"],
  },
  {
    slug: "sedation-dentistry",
    title: "Sedation Dentistry for Nervous Patients in Sacramento",
    navLabel: "Comfort & sedation",
    eyebrow: "Anxious-patient care",
    description:
      "Explore comfort-focused and sedation dentistry options for nervous dental patients at Sacramento Dental Medicine in Antelope, CA.",
    intro:
      "Dental anxiety is common and never something to be embarrassed about. Tell the team what has made past visits difficult, and they will slow the pace, explain each step, and discuss which comfort options may be appropriate for your health and treatment needs.",
    benefits: [
      "A judgment-free conversation about dental anxiety",
      "Clear explanations before treatment begins",
      "An unhurried, comfort-focused approach",
      "Options reviewed around your health and procedure",
    ],
    steps: [
      {
        title: "Share what worries you",
        body: "Let the team know about fear, sensitivity, a strong gag reflex, or a difficult previous experience.",
      },
      {
        title: "Build a comfort plan",
        body: "The dentist reviews your health, treatment needs, and available comfort options with you.",
      },
      {
        title: "Move at a clear pace",
        body: "You know what is happening next, and the team checks in throughout the visit.",
      },
    ],
    faqs: [
      {
        question: "Can I ask about sedation before scheduling treatment?",
        answer:
          "Yes. Start by telling the team that dental anxiety is part of your concern. A dentist must review your health and treatment needs before recommending an option.",
      },
      {
        question: "What if I have avoided the dentist for years?",
        answer:
          "You are not alone. The first goal is to understand what is happening now and build a manageable plan without judgment.",
      },
    ],
    relatedSlugs: ["dental-crowns", "tooth-extractions"],
  },
  {
    slug: "orthodontics",
    title: "Orthodontics & Clear Aligners in Sacramento, CA",
    navLabel: "Orthodontics",
    eyebrow: "Straighter smiles",
    description:
      "Explore orthodontic treatment and Invisalign clear aligners at Sacramento Dental Medicine in Antelope, serving Sacramento-area patients.",
    intro:
      "Orthodontic treatment can improve alignment, bite, cleaning access, and confidence. The practice offers Invisalign clear aligner planning and will explain whether aligners fit your goals or whether another approach should be considered.",
    benefits: [
      "Evaluate tooth alignment and bite",
      "Review clear aligner treatment",
      "Plan around your daily routine and goals",
      "Understand alternatives before committing",
    ],
    steps: [
      {
        title: "Evaluate your bite",
        body: "The dentist looks at alignment, spacing, crowding, and how your upper and lower teeth meet.",
      },
      {
        title: "Compare approaches",
        body: "You will learn whether clear aligners fit the case and what alternatives may be more appropriate.",
      },
      {
        title: "Plan the sequence",
        body: "If you move forward, the team maps the treatment and the follow-up visits needed to monitor progress.",
      },
    ],
    faqs: [
      {
        question: "Do you offer Invisalign in the Sacramento area?",
        answer:
          "Yes. Sacramento Dental Medicine lists Invisalign clear aligners among its cosmetic treatment options. An evaluation determines whether aligners fit your needs.",
      },
      {
        question: "Are clear aligners right for every orthodontic case?",
        answer:
          "No. Some alignment and bite concerns need a different type of treatment. The dentist can explain the most appropriate next step after an evaluation.",
      },
    ],
    relatedSlugs: ["invisalign", "dental-crowns"],
  },
  {
    slug: "invisalign",
    title: "Invisalign Clear Aligners in Sacramento & Antelope",
    navLabel: "Invisalign",
    eyebrow: "Clear aligners",
    description:
      "Ask about Invisalign clear aligners at Sacramento Dental Medicine in Antelope, serving patients across the Sacramento area.",
    intro:
      "Invisalign uses a planned series of removable clear aligners to move teeth over time. An evaluation shows whether your alignment and bite are a good fit and gives you a clearer picture of the treatment sequence.",
    benefits: [
      "Clear, removable aligners",
      "Take aligners out for meals and brushing",
      "Treatment planned around your smile and bite",
      "Regular progress checks with the dental team",
    ],
    steps: [
      {
        title: "Start with an evaluation",
        body: "The dentist reviews your teeth, bite, goals, and oral health to see whether clear aligners are appropriate.",
      },
      {
        title: "Review the plan",
        body: "You will understand the proposed tooth movement, expected responsibilities, and follow-up schedule before starting.",
      },
      {
        title: "Track progress",
        body: "You change aligners as directed and return for checks so the team can monitor movement and fit.",
      },
    ],
    faqs: [
      {
        question: "Can I remove Invisalign aligners?",
        answer:
          "Yes. Clear aligners are removable for meals, brushing, and flossing, but they need to be worn as directed for treatment to progress.",
      },
      {
        question: "How do I know if I am an Invisalign candidate?",
        answer:
          "A dental and bite evaluation is needed. The dentist will consider your alignment, oral health, and treatment goals before recommending clear aligners.",
      },
    ],
    relatedSlugs: ["orthodontics", "dental-crowns"],
  },
  {
    slug: "tooth-extractions",
    title: "Tooth Extractions in Sacramento & Antelope, CA",
    navLabel: "Tooth extractions",
    eyebrow: "Oral surgery",
    description:
      "Get an evaluation for a painful, damaged, or non-restorable tooth at Sacramento Dental Medicine in Antelope, CA.",
    intro:
      "When a tooth cannot be predictably restored, extraction may be the healthiest next step. The team will first evaluate the tooth, explain whether it can be saved, and review what to expect if removal is recommended.",
    benefits: [
      "Evaluate pain, damage, and infection risk",
      "Understand whether the tooth can be saved",
      "Plan a gentle, clear extraction visit",
      "Discuss replacement options when appropriate",
    ],
    steps: [
      {
        title: "Diagnose the problem",
        body: "An exam and any necessary imaging help the dentist understand the tooth, roots, and nearby structures.",
      },
      {
        title: "Review your choices",
        body: "The dentist explains whether restoration is reasonable or removal is the safer path.",
      },
      {
        title: "Plan recovery",
        body: "You receive instructions for caring for the area and learn whether tooth replacement should be considered.",
      },
    ],
    faqs: [
      {
        question: "Does every painful tooth need to be extracted?",
        answer:
          "No. Pain can come from several causes, and some teeth can be restored. An exam and imaging help determine the right treatment.",
      },
      {
        question: "What should I do for severe tooth pain now?",
        answer:
          "Call the office at (916) 727-6453. The team can provide immediate guidance and ask about the earliest available visit.",
      },
    ],
    relatedSlugs: ["dental-implants", "sedation-dentistry"],
  },
  {
    slug: "dental-implants",
    title: "Dental Implants in Sacramento & Antelope, CA",
    navLabel: "Dental implants",
    eyebrow: "Tooth replacement",
    description:
      "Explore dental implant treatment at Sacramento Dental Medicine in Antelope, serving Sacramento-area patients with missing teeth.",
    intro:
      "A dental implant replaces a missing tooth from the root up and can support a natural-looking restoration. The planning visit evaluates your teeth, gums, and bone so the team can explain whether implant treatment fits your needs.",
    benefits: [
      "Replace a missing tooth from the root up",
      "Support comfortable chewing",
      "Plan around bone and gum health",
      "Create a stable, natural-looking restoration",
    ],
    steps: [
      {
        title: "Evaluate the site",
        body: "The team reviews your oral health and uses appropriate imaging to understand the available bone and nearby structures.",
      },
      {
        title: "Build the plan",
        body: "You will learn the sequence, timing, and any preparatory care that may be needed before treatment begins.",
      },
      {
        title: "Restore the tooth",
        body: "After the implant is ready, a custom restoration completes the visible and functional part of the tooth.",
      },
    ],
    faqs: [
      {
        question: "Am I a candidate for a dental implant?",
        answer:
          "That depends on your oral health, bone, medical history, and the location of the missing tooth. A planning visit is needed for a reliable answer.",
      },
      {
        question: "Can an implant replace one missing tooth?",
        answer:
          "Yes. Dental implants can be used to replace a single missing tooth, while other implant-supported options may be considered for several missing teeth.",
      },
    ],
    relatedSlugs: ["tooth-extractions", "dental-crowns"],
  },
  {
    slug: "gum-disease-treatment",
    title: "Gum Disease Treatment in Sacramento & Antelope",
    navLabel: "Gum disease treatment",
    eyebrow: "Periodontal care",
    description:
      "Get an evaluation and personalized gum disease treatment at Sacramento Dental Medicine in Antelope, serving the Sacramento area.",
    intro:
      "Bleeding, tenderness, persistent bad breath, or gum recession can be signs that the tissues supporting your teeth need attention. The team evaluates gum health and recommends care based on what they find rather than a one-size plan.",
    benefits: [
      "Measure and monitor gum health",
      "Address inflammation and infection risk",
      "Protect the structures supporting your teeth",
      "Build a practical home-care routine",
    ],
    steps: [
      {
        title: "Evaluate gum health",
        body: "The team checks the gums, supporting structures, and areas that may need more focused attention.",
      },
      {
        title: "Explain the findings",
        body: "You will understand what the measurements mean and whether routine or more advanced gum care is recommended.",
      },
      {
        title: "Maintain the result",
        body: "The plan includes professional follow-up and practical steps to support gum health at home.",
      },
    ],
    faqs: [
      {
        question: "Are bleeding gums normal?",
        answer:
          "Occasional irritation can happen, but recurring bleeding can be a sign of inflammation or gum disease and is worth evaluating.",
      },
      {
        question: "Can gum disease affect my teeth?",
        answer:
          "Yes. Advanced gum disease can damage the tissues and bone that support teeth. Earlier evaluation creates more options for protecting them.",
      },
    ],
    relatedSlugs: ["our-services", "dental-crowns"],
  },
  {
    slug: "dental-emergencies",
    title: "Emergency Dentist in Sacramento & Antelope, CA",
    navLabel: "Dental emergencies",
    eyebrow: "Urgent dental care",
    description:
      "Call Sacramento Dental Medicine for urgent dental pain, swelling, a broken tooth, or a lost filling or crown in Antelope, CA.",
    intro:
      "Dental pain and accidents need clear guidance quickly. Call the office first so the team can understand what happened, tell you what to do now, and check the earliest available visit.",
    benefits: [
      "Guidance for severe tooth pain or swelling",
      "Evaluation of chipped or broken teeth",
      "Help with lost fillings or crowns",
      "Same-day visits when availability allows",
    ],
    steps: [
      {
        title: "Call the office",
        body: "Describe the pain, swelling, injury, or missing restoration so the team can guide the next step.",
      },
      {
        title: "Stabilize the problem",
        body: "The first goal is to identify the cause, relieve immediate risk, and protect the tooth when possible.",
      },
      {
        title: "Plan definitive care",
        body: "Once the problem is diagnosed, the dentist explains the treatment choices and follow-up needed.",
      },
    ],
    faqs: [
      {
        question: "What should I do for a dental emergency?",
        answer:
          "Call Sacramento Dental Medicine at (916) 727-6453. For uncontrolled bleeding, trouble breathing, or a life-threatening injury, call 911.",
      },
      {
        question: "Can you see dental emergencies the same day?",
        answer:
          "The practice offers same-day emergency visits when possible. Calling first is the fastest way to ask about current availability.",
      },
    ],
    relatedSlugs: ["tooth-extractions", "dental-crowns", "sedation-dentistry"],
  },
];

export const servicePageBySlug = new Map(
  servicePages.map((service) => [service.slug, service]),
);
