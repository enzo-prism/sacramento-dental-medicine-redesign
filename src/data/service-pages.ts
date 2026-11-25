export type ServicePage = {
  slug: string;
  title: string;
  navLabel: string;
  eyebrow: string;
  description: string;
  /**
   * How the page appears in search results and link previews, when it should
   * differ from the on-page H1 (`title`) and directory card copy
   * (`description`). Use only facts already in `src/data/site.ts` or this file.
   */
  searchTitle?: string;
  searchDescription?: string;
  bookingLabel?: string;
  intro: string;
  benefits: string[];
  steps: { title: string; body: string }[];
  faqs: { question: string; answer: string; links?: { href: string; label: string }[] }[];
  relatedSlugs: string[];
  nearbyLinks?: { href: string; label: string }[];
  sources?: { label: string; url: string }[];
};

export const serviceJsonLdTypes: Record<string, string> = {
  "dental-implants": "Dental implants",
  "wisdom-teeth": "Wisdom teeth",
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
      "From checkups, cleanings, and children's visits to whitening, veneers, dentures, root canal treatment, wisdom teeth, and PRF or grafting support, Sacramento Dental Medicine brings a broad range of care into one familiar office. Start with an exam and a clear conversation about what matters to you, then build the treatment plan from there.",
    benefits: [
      "Exams, cleanings, children's dentistry, and gum care",
      "Whitening, veneers, bonding, and clear aligners",
      "Crowns, bridges, implants, dentures, and root canal treatment",
      "Wisdom teeth, extractions, and PRF or grafting support",
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
        question: "What dental services does Sacramento Dental Medicine offer?",
        answer:
          "Preventive exams and cleanings, children's dentistry, gum disease treatment, night guards, teeth whitening, bonding, porcelain veneers, Invisalign and orthodontics, crowns and bridges, dental implants, full and partial dentures, root canal treatment with an endodontic specialist, tooth extractions, wisdom teeth removal, PRF and grafting, sedation planning for anxious patients, and urgent dental care.",
      },
      { question: "Where is Sacramento Dental Medicine located?", answer: "The office is at 4320 Elverta Rd #3, Antelope, CA 95843. Sacramento Dental Medicine serves patients from Antelope and the greater Sacramento area at this location." },
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
    relatedSlugs: ["preventive-care", "cosmetic", "dental-emergencies"],
  },
  // Restored November 20, 2026. These six URLs were live pages on the
  // practice's previous site and had been redirecting to this directory.
  // Practice-specific facts (fluoride and sealants, a first child visit around
  // age one, an early bite check around age seven, in-office or take-home
  // whitening, bonding, custom mouthguards) come from those pages as archived
  // May–July 2026 and from `services` in src/data/site.ts. Clinical
  // explanations stay general and link ADA patient education.
  {
    slug: "preventive-care",
    title: "Dental Exams & Cleanings in Antelope, CA",
    searchTitle: "Teeth Cleaning & Dental Exam in Antelope, CA",
    searchDescription:
      "Checkups, cleanings, digital X-rays, fluoride and sealants for all ages on Elverta Rd in Antelope. New patients welcome. Call (916) 727-6453.",
    navLabel: "Exams & cleanings",
    eyebrow: "Preventive care",
    description:
      "Routine exams, professional cleanings, digital X-rays, fluoride, and sealants for patients of all ages at Sacramento Dental Medicine in Antelope.",
    intro:
      "Regular checkups and cleanings catch small problems while they are still small. A preventive visit at the Elverta Road office can include a comprehensive exam, a professional cleaning to remove plaque and tartar, digital X-rays when they are needed, an oral cancer screening, and fluoride or sealants when they fit your teeth.",
    benefits: [
      "Professional cleaning to remove plaque and tartar",
      "Exam for cavities, gum disease, and wear",
      "Digital X-rays only when they are needed",
      "Oral cancer screening at routine exams",
    ],
    steps: [
      {
        title: "Catch up on your history",
        body: "Share any changes in your health, medications, and anything that has bothered you since your last visit.",
      },
      {
        title: "Exam and cleaning",
        body: "The team cleans your teeth and checks teeth, gums, and soft tissue, adding X-rays only when the dentist needs them.",
      },
      {
        title: "Know what comes next",
        body: "You hear what was found, what can wait, and when to come back, before you leave the chair.",
      },
    ],
    nearbyLinks: [{ href: "/new-patients", label: "What to bring to your first visit" }],
    faqs: [
      {
        question: "What happens at a dental checkup and cleaning?",
        answer:
          "Expect a professional cleaning to remove plaque and tartar, an exam of your teeth and gums, an oral cancer screening, and digital X-rays if the dentist needs them. Before you leave, the dentist explains what was found and what, if anything, needs attention.",
      },
      {
        question: "How often should I get a dental cleaning?",
        answer:
          "The dentist recommends a schedule based on your gum health, cavity risk, and history. Many patients come in twice a year; people being treated for gum disease may need visits more often.",
        links: [{ href: "/gum-disease-treatment", label: "treated for gum disease" }],
      },
      {
        question: "Do you take X-rays at every visit?",
        answer:
          "No. X-rays are taken when the dentist needs to see something an exam cannot show, such as decay between teeth or bone levels. The office uses digital X-rays, which use less radiation than traditional film.",
      },
      {
        question: "It has been years since my last cleaning. Is that a problem?",
        answer:
          "No. Patients often come back after years away, and many ask for Dr. Narodovich by name. There is no lecture: the first visit is an exam and a conversation about what was found, and the cleaning plan is built from there.",
        links: [{ href: "/meet-dr-narodovich", label: "Dr. Narodovich" }],
      },
      {
        question: "Do you accept Medi-Cal for cleanings?",
        answer:
          "We do not accept Medi-Cal. For other dental plans, call (916) 727-6453 to confirm whether your plan is accepted before your visit.",
      },
    ],
    sources: [
      { label: "ADA: X-rays", url: "https://www.mouthhealthy.org/all-topics-a-z/x-rays" },
      { label: "ADA: Fluoride", url: "https://www.mouthhealthy.org/all-topics-a-z/fluoride" },
      { label: "ADA: Sealants", url: "https://www.mouthhealthy.org/all-topics-a-z/sealants" },
      { label: "ADA: Oral cancer", url: "https://www.mouthhealthy.org/all-topics-a-z/oral-cancer" },
    ],
    relatedSlugs: ["gum-disease-treatment", "dental-care-children", "bruxism"],
  },
  {
    slug: "dental-care-children",
    title: "Children's Dentistry in Antelope, CA",
    searchTitle: "Kids Dentist in Antelope, CA | Family Dental Care",
    searchDescription:
      "Gentle checkups for kids at a family dental office in Antelope: a first visit around age one, then cleanings and fluoride. Call (916) 727-6453.",
    navLabel: "Children's dentistry",
    eyebrow: "Family dentistry",
    description:
      "Gentle, family-friendly dental visits for children at Sacramento Dental Medicine in Antelope, from a first visit around age one through the teen years.",
    intro:
      "Kids are seen in the same Antelope office as the rest of the family. The practice encourages a first visit around age one: a relaxed, no-pressure appointment where Dr. Narodovich looks over your child's teeth and talks with you about habits at home. Later visits add cleanings, fluoride, and X-rays when they are needed.",
    benefits: [
      "A no-pressure first visit around age one",
      "Cleanings, fluoride, and X-rays when needed",
      "Brushing and flossing coaching for kids and parents",
      "An early bite check around age seven",
    ],
    steps: [
      {
        title: "Meet the team",
        body: "The first visit is short and friendly: a gentle look at your child's teeth and a conversation with you about habits, feeding, and brushing.",
      },
      {
        title: "Clean and protect",
        body: "As your child grows, visits add cleanings and fluoride, with X-rays only when the dentist needs them.",
      },
      {
        title: "Watch the bite develop",
        body: "Around age seven, the dentist checks how teeth and jaws are developing and flags anything worth watching early.",
      },
    ],
    faqs: [
      {
        question: "When should my child first see the dentist?",
        answer:
          "Sacramento Dental Medicine encourages a first visit around your child's first birthday. It is a no-pressure, meet-and-greet appointment: Dr. Narodovich does a gentle visual exam, counts the baby teeth, and talks with you about keeping them healthy.",
      },
      {
        question: "Can my whole family see the same dentist?",
        answer:
          "Yes. The practice welcomes patients of all ages, so parents and children can be seen at the same office on Elverta Road in Antelope.",
      },
      {
        question: "When should my child's bite be checked for braces?",
        answer:
          "Around age seven, the dentist does an early orthodontic check of how the bite and jaws are developing. Some problems, including effects of thumb sucking or tongue thrusting, are easier to guide while a child is still growing. Not every child needs early treatment.",
        links: [{ href: "/orthodontics", label: "early orthodontic check" }],
      },
      {
        question: "What if my child is nervous about the dentist?",
        answer:
          "Tell the team when you book. Visits for young children start slowly, with simple explanations and no surprises, so the first experiences at the dentist are positive ones.",
      },
      {
        question: "What should I do if my child chips or knocks out a tooth?",
        answer:
          "Treat it as a dental emergency and call (916) 727-6453 right away for guidance. For a head injury, uncontrolled bleeding, or trouble breathing, call 911.",
        links: [{ href: "/dental-emergencies", label: "dental emergency" }],
      },
    ],
    sources: [
      { label: "ADA: Baby teeth", url: "https://www.mouthhealthy.org/all-topics-a-z/baby-teeth" },
      { label: "ADA: Fluoride", url: "https://www.mouthhealthy.org/all-topics-a-z/fluoride" },
      { label: "ADA: Sealants", url: "https://www.mouthhealthy.org/all-topics-a-z/sealants" },
    ],
    relatedSlugs: ["preventive-care", "orthodontics", "dental-emergencies"],
  },
  {
    slug: "cosmetic",
    title: "Cosmetic Dentistry in Antelope & Sacramento, CA",
    searchTitle: "Cosmetic Dentist in Antelope, CA | Whitening & Veneers",
    searchDescription:
      "Whitening, bonding, porcelain veneers and Invisalign with Dr. Michael Narodovich in Antelope, planned around your face. Call (916) 727-6453.",
    navLabel: "Cosmetic dentistry",
    eyebrow: "Cosmetic dentistry",
    description:
      "Professional whitening, tooth-colored bonding, porcelain veneers, and Invisalign at Sacramento Dental Medicine in Antelope, serving greater Sacramento.",
    intro:
      "Cosmetic dentistry changes how your smile looks: its color, shape, spacing, or alignment. Dr. Michael Narodovich's work includes family and cosmetic dentistry, and options at the Antelope office include professional whitening, tooth-colored bonding, porcelain veneers, and Invisalign clear aligners, planned around your face rather than a template.",
    benefits: [
      "Professional whitening, in the office or at home",
      "Tooth-colored bonding for chips and small gaps",
      "Porcelain veneers for shape, size, and color",
      "Invisalign clear aligners for crowding and spacing",
    ],
    steps: [
      {
        title: "Say what you would change",
        body: "Start with what bothers you about your smile, photos you like, and how much change you want.",
      },
      {
        title: "Check health first",
        body: "An exam makes sure cavities, gum problems, or grinding are handled before cosmetic work, so results last.",
      },
      {
        title: "Compare the options",
        body: "The dentist explains which approaches fit, from the most conservative up, with what each involves and costs.",
      },
    ],
    nearbyLinks: [{ href: "/meet-dr-narodovich", label: "Meet Dr. Narodovich" }],
    faqs: [
      {
        question: "Which cosmetic treatment is right for me?",
        answer:
          "It depends on what you want to change. Whitening addresses color, bonding repairs small chips and gaps, veneers change shape, size, and color, and Invisalign moves teeth. An exam and a conversation about your goals narrow the choice.",
      },
      {
        question: "What is dental bonding?",
        answer:
          "Bonding applies tooth-colored resin to the surface of a tooth to repair chips, cracks, or small gaps. It usually changes less of the natural tooth than a veneer or crown.",
      },
      {
        question: "Does dental insurance cover cosmetic dentistry?",
        answer:
          "Treatment done only to change appearance is often not covered. Call the front desk at (916) 727-6453 to check your plan and ask about the payment options currently available.",
      },
      {
        question: "Can I have cosmetic work if I have cavities or gum disease?",
        answer:
          "Those are usually treated first. A checkup and cleaning come before cosmetic work, because healthy teeth and gums give it a stable foundation and help results last.",
        links: [{ href: "/preventive-care", label: "checkup and cleaning" }],
      },
    ],
    sources: [
      { label: "ADA: Teeth whitening", url: "https://www.mouthhealthy.org/all-topics-a-z/teeth-whitening" },
      { label: "ADA: Veneers", url: "https://www.mouthhealthy.org/all-topics-a-z/veneers" },
    ],
    relatedSlugs: ["teeth-whitening", "veneers", "invisalign"],
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening in Antelope & Sacramento, CA",
    searchTitle: "Professional Teeth Whitening in Antelope, CA",
    searchDescription:
      "In-office or take-home teeth whitening, planned after an exam at Sacramento Dental Medicine in Antelope. Ask what fits your stains: (916) 727-6453.",
    navLabel: "Teeth whitening",
    eyebrow: "Cosmetic dentistry",
    description:
      "Professional in-office or take-home teeth whitening at Sacramento Dental Medicine in Antelope, planned after an exam of your teeth and existing work.",
    intro:
      "Professional whitening can lift many stains from coffee, tea, wine, and time. Sacramento Dental Medicine offers whitening in the office or with take-home kits, planned after an exam so the dentist can check for cavities, gum problems, or crowns and fillings that whitening will not change.",
    benefits: [
      "In-office or take-home options",
      "An exam first, so whitening suits your teeth",
      "Guidance if your teeth are sensitive",
      "A plan for crowns, fillings, and veneers that will not lighten",
    ],
    steps: [
      {
        title: "Find the cause",
        body: "The dentist looks at why teeth are discolored. Surface stains respond well; some deeper discoloration needs a different approach.",
      },
      {
        title: "Choose a method",
        body: "Decide between whitening in the office or at home with take-home kits, based on your timeline and sensitivity.",
      },
      {
        title: "Keep the result",
        body: "Get advice on staining foods and drinks, home care, and when a touch-up makes sense.",
      },
    ],
    faqs: [
      {
        question: "Is professional whitening better than store-bought kits?",
        answer:
          "Professional whitening is supervised by a dentist, who first checks that your teeth and gums are healthy and that the discoloration is the kind whitening can treat. Results vary from person to person either way.",
      },
      {
        question: "Will whitening change the color of my crowns or fillings?",
        answer:
          "No. Whitening works on natural tooth enamel, so crowns, tooth-colored fillings, and veneers keep their current shade. The dentist can plan around them, or discuss replacing visible work afterward to match.",
        links: [{ href: "/veneers", label: "veneers" }],
      },
      {
        question: "Does teeth whitening cause sensitivity?",
        answer:
          "Some people notice temporary sensitivity during or after whitening. Tell the dentist if your teeth are already sensitive so the approach can be adjusted.",
      },
      {
        question: "How long do whitening results last?",
        answer:
          "It varies. Coffee, tea, red wine, and tobacco bring stains back sooner. Good home care and occasional touch-ups help results last longer.",
      },
      {
        question: "How much does teeth whitening cost?",
        answer:
          "It depends on whether you whiten in the office or at home. Whitening is usually considered cosmetic, so call (916) 727-6453 for current pricing and to check your plan.",
      },
    ],
    sources: [{ label: "ADA: Teeth whitening", url: "https://www.mouthhealthy.org/all-topics-a-z/teeth-whitening" }],
    relatedSlugs: ["cosmetic", "veneers", "invisalign"],
  },
  {
    slug: "veneers",
    title: "Porcelain Veneers in Antelope & Sacramento, CA",
    searchTitle: "Porcelain Veneers in Antelope & Sacramento | Smile Design",
    searchDescription:
      "Custom porcelain veneers planned around your face and bite by Dr. Michael Narodovich in Antelope. Compare veneers, bonding and whitening first.",
    navLabel: "Porcelain veneers",
    eyebrow: "Cosmetic dentistry",
    description:
      "Custom porcelain veneers to change the shape, size, or color of front teeth at Sacramento Dental Medicine in Antelope, serving greater Sacramento.",
    intro:
      "Veneers are thin, custom-made porcelain shells bonded to the front of teeth to change their color, shape, or size. Dr. Narodovich plans veneers around your face, bite, and goals, and will also tell you when whitening, bonding, or aligners could reach a similar result with less change to your natural teeth.",
    benefits: [
      "Change the shape, size, or color of front teeth",
      "Cover chips, wear, and stains whitening cannot lift",
      "Planned around your face and bite",
      "A frank comparison with more conservative options",
    ],
    steps: [
      {
        title: "Plan the smile",
        body: "Discuss what you want to change, check your bite and gums, and review whether veneers are the right tool.",
      },
      {
        title: "Prepare the teeth",
        body: "A thin layer of enamel is usually reshaped so the veneers sit naturally, and impressions or scans go to the lab.",
      },
      {
        title: "Bond and check the bite",
        body: "The finished veneers are bonded in place and your bite is checked so they feel and function like your own teeth.",
      },
    ],
    nearbyLinks: [{ href: "/meet-dr-narodovich", label: "Meet Dr. Narodovich" }],
    faqs: [
      {
        question: "Are porcelain veneers permanent?",
        answer:
          "Placing porcelain veneers usually removes a thin layer of enamel, so the change is generally not reversible. Veneers themselves can wear or chip over time and may eventually need replacement.",
      },
      {
        question: "Who is a good candidate for veneers?",
        answer:
          "Adults with healthy teeth and gums who want to change the shape, size, or color of front teeth. Active decay, gum disease, or heavy grinding should usually be addressed first.",
        links: [{ href: "/bruxism", label: "heavy grinding" }],
      },
      {
        question: "What are the alternatives to veneers?",
        answer:
          "Whitening for color, tooth-colored bonding for small chips and gaps, Invisalign for crowding or spacing, and crowns for teeth that need more strength. The dentist will explain which options fit your teeth.",
        links: [
          { href: "/teeth-whitening", label: "Whitening" },
          { href: "/invisalign", label: "Invisalign" },
        ],
      },
      {
        question: "How much do porcelain veneers cost?",
        answer:
          "The estimate depends on how many teeth are involved and any treatment needed first. Veneers are usually considered cosmetic; ask the front desk about payment options after your consultation.",
      },
    ],
    sources: [{ label: "ADA: Veneers", url: "https://www.mouthhealthy.org/all-topics-a-z/veneers" }],
    relatedSlugs: ["cosmetic", "teeth-whitening", "dental-crowns"],
  },
  {
    slug: "bruxism",
    title: "Teeth Grinding & Night Guards in Antelope, CA",
    searchTitle: "Teeth Grinding (Bruxism) & Night Guards | Antelope, CA",
    searchDescription:
      "Sore jaw or worn teeth when you wake up? Get checked for grinding and fitted for a custom night guard in Antelope. Call (916) 727-6453.",
    navLabel: "Teeth grinding & night guards",
    eyebrow: "Preventive care",
    description:
      "Evaluation for teeth grinding and clenching (bruxism) and custom-fitted night guards at Sacramento Dental Medicine in Antelope, CA.",
    intro:
      "Waking up with a sore jaw, a headache, or teeth that feel more sensitive can be signs of grinding or clenching during sleep, called bruxism. The dentist checks for wear, cracks, and jaw strain and can fit a custom night guard to protect your teeth while you sleep.",
    benefits: [
      "Check for wear, cracks, and jaw strain",
      "Custom-fitted night guards",
      "Protect crowns, veneers, and natural teeth",
      "Practical advice on common triggers",
    ],
    steps: [
      {
        title: "Look for signs",
        body: "The exam checks for flattened or chipped teeth, sensitivity, and tenderness in the jaw muscles.",
      },
      {
        title: "Fit a guard",
        body: "If a night guard makes sense, it is made from an impression or scan of your teeth so it fits closely and stays in place.",
      },
      {
        title: "Follow up",
        body: "The guard and your teeth are checked at regular visits, and damaged teeth are repaired if needed.",
      },
    ],
    faqs: [
      {
        question: "What are the signs that I grind my teeth at night?",
        answer:
          "Common signs include a sore jaw or headache on waking, teeth that look flat or chipped, new sensitivity, or a partner hearing grinding at night. Many people do not know they grind until a dentist sees the wear.",
      },
      {
        question: "Is a custom night guard better than a store-bought one?",
        answer:
          "A custom night guard is made from your own teeth, so it usually fits more closely and comfortably than a boil-and-bite guard. The dentist will recommend what suits your bite.",
      },
      {
        question: "What causes teeth grinding?",
        answer:
          "Stress, anxiety, sleep problems, and the way teeth fit together are commonly linked to grinding. Cutting back on caffeine and alcohol and keeping a calm bedtime routine can help alongside a guard.",
      },
      {
        question: "Can grinding damage my teeth?",
        answer:
          "Yes. Over time it can wear teeth down, crack them, or damage fillings and crowns. A tooth that is badly worn or cracked may need a crown to protect it.",
        links: [{ href: "/dental-crowns", label: "need a crown" }],
      },
      {
        question: "Does dental insurance cover night guards?",
        answer:
          "Some plans do. Call (916) 727-6453 to check your coverage and the current cost before your visit.",
      },
    ],
    sources: [
      { label: "ADA: Teeth grinding", url: "https://www.mouthhealthy.org/all-topics-a-z/teeth-grinding" },
      { label: "ADA: Mouthguards", url: "https://www.mouthhealthy.org/all-topics-a-z/mouthguards" },
    ],
    relatedSlugs: ["dental-crowns", "preventive-care", "veneers"],
  },
  {
    slug: "dental-crowns",
    title: "Dental Crowns in Sacramento & Antelope, CA",
    searchTitle: "Dental Crowns Sacramento & Antelope | Cracked Tooth Repair",
    searchDescription:
      "Cracked or worn tooth? Get a crown exam in Antelope and an estimate based on your tooth and insurance. Book online or call (916) 727-6453.",
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
        question: "Do you offer dental bridges?",
        answer:
          "Yes. A bridge replaces one or more missing teeth with a false tooth held by crowns on the neighboring teeth. The dentist will compare a bridge with an implant or a partial denture for your situation.",
        links: [
          { href: "/dental-implants", label: "an implant" },
          { href: "/dentures", label: "a partial denture" },
        ],
      },
      { question: "How is a crown different from an implant?", answer: "A crown restores the visible part of a damaged tooth. An implant replaces a missing tooth root and can support a crown. The exam determines whether your existing tooth can be restored or whether replacement should be considered." },
      { question: "How much does a dental crown cost?", answer: "The estimate depends on the tooth, the restoration, any additional treatment, and your insurance benefits. Ask the front desk about the exam cost and request a treatment estimate after the dentist evaluates the tooth." },
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
    sources: [{"label": "ADA: Crowns", "url": "https://www.mouthhealthy.org/all-topics-a-z/crowns"}, { label: "ADA: Bridges", url: "https://www.mouthhealthy.org/all-topics-a-z/bridges" }],
    relatedSlugs: ["dental-implants", "tooth-extractions"],
  },
  {
    slug: "sedation-dentistry",
    title: "Dental Care for Nervous Patients in Antelope",
    bookingLabel: "Request a comfort consultation",
    searchTitle: "Dentist for Nervous Patients in Antelope | Sedation FAQs",
    searchDescription:
      "Nervous about a dental visit? Ask our Antelope team about a gentler pace, local numbing and sedation options for your procedure. Call (916) 727-6453.",
    navLabel: "Comfort & sedation",
    eyebrow: "Anxious-patient care",
    description:
      "Explore comfort-focused and sedation dentistry options for nervous dental patients at Sacramento Dental Medicine in Antelope, CA.",
    intro:
      "Tell us what made your last visit difficult. Our Antelope team can slow the pace, explain each step and use computer-guided local numbing when appropriate. If you want sedation, ask which options are available for your procedure, who would provide them and whether you would need a referral.",
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
      { question: "What should I discuss before choosing sedation?", answer: "Bring a current medication list and tell the dentist about allergies, medical conditions, previous anesthesia experiences, and the dental work you are considering. Ask who will provide and monitor your care, which approach is available in Antelope, and what preparation and recovery arrangements apply to you." },
      { question: "How is the cost of comfort or sedation care estimated?", answer: "Ask the office which services are included in your treatment estimate and whether any comfort or sedation service is separate. The dentist must assess your health and planned procedure before confirming an option or a fee." },
      { question: "Which sedation options can I request?", answer: "Call the office to ask which options are currently available. A dentist must review your medical history and planned treatment before confirming whether sedation is appropriate. You can ask about the consultation fee and request a written estimate before booking treatment." },
      { question: "Is local numbing the same as sedation?", answer: "Local anesthesia numbs the area being treated. Sedation is a separate approach to managing awareness or anxiety. Tell the dentist about your concerns so they can explain the available comfort choices and any preparation instructions." },
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
    sources: [{ label: "ADA: Anesthesia and sedation", url: "https://www.mouthhealthy.org/all-topics-a-z/anesthesia-and-sedation" }],
    nearbyLinks: [{ href: "/meet-dr-narodovich", label: "Meet Dr. Narodovich" }],
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
      { question: "How are orthodontics and Invisalign related?", answer: "Orthodontics is the broader area of care for tooth alignment and bite. Invisalign is one clear aligner treatment option. This practice offers Invisalign evaluations; the dentist will explain whether aligners or another approach fits your needs." },
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
    sources: [{"label": "ADA: Braces and aligners", "url": "https://www.mouthhealthy.org/all-topics-a-z/braces"}],
    relatedSlugs: ["invisalign", "dental-crowns"],
  },
  {
    slug: "invisalign",
    title: "Invisalign Clear Aligners in Sacramento & Antelope",
    searchTitle: "Invisalign in Sacramento & Antelope | Is It Right for You?",
    searchDescription:
      "Find out if Invisalign clear aligners fit your teeth and bite at an evaluation in Antelope. Get a cost estimate based on your plan and dental benefits.",
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
      { question: "How long does Invisalign treatment take?", answer: "Treatment length depends on the planned tooth movement, your bite, and how consistently you follow the wear instructions. An evaluation is needed before the dentist can discuss a timeline for your case." },
      { question: "How much does Invisalign cost?", answer: "Cost depends on the treatment plan and your dental benefits. Ask for an estimate after your alignment and bite evaluation, and confirm any orthodontic coverage with the front desk and your insurer." },
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
    sources: [{"label": "ADA: Braces and aligners", "url": "https://www.mouthhealthy.org/all-topics-a-z/braces"}],
    relatedSlugs: ["orthodontics", "dental-crowns"],
  },
  {
    slug: "tooth-extractions",
    title: "Tooth Extractions in Sacramento & Antelope, CA",
    searchTitle: "Tooth Extraction & Oral Surgery Evaluation | Sacramento",
    searchDescription:
      "Painful or damaged tooth? Get an extraction evaluation in Antelope. Learn whether the tooth can be saved, what removal involves, and how recovery is planned.",
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
    relatedSlugs: ["dental-emergencies", "sedation-dentistry", "wisdom-teeth", "dental-implants", "platelet-rich-fibrin"],
  },
  {
    slug: "dental-implants",
    title: "Dental Implants in Sacramento & Antelope, CA",
    navLabel: "Dental implants",
    eyebrow: "Tooth replacement",
    description:
      "Explore dental implant treatment at Sacramento Dental Medicine in Antelope, serving Sacramento-area patients. Call (916) 727-6453 or request a visit.",
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
      { question: "Is getting a dental implant a single appointment?", answer: "Implant treatment involves planning, placement, healing, and the final restoration. Healing and any preparatory treatment affect the timeline. Ask the dentist to explain your sequence before starting; a finished tooth in one visit is not guaranteed." },
      { question: "What are the alternatives to a dental implant?", answer: "Depending on which teeth are missing and the health of the remaining teeth, a bridge or a removable partial or full denture may be considered. The dentist can compare the options with you at an exam." },
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
      {
        question: "What if I need bone support for an implant?",
        answer:
          "The exam and planning visit evaluate bone and gum health. Grafting needs are reviewed case by case, and PRF or grafting may be recommended when extra support could help the site. See PRF & grafting for how that conversation works.",
        links: [{ href: "/platelet-rich-fibrin", label: "PRF & grafting" }],
      },
      {
        question: "Can I be sedated for dental implant treatment?",
        answer:
          "Tell the team if dental anxiety is part of your concern. A dentist must review your medical history and planned treatment before confirming whether sedation is appropriate. Do not assume a particular medication or method is offered. Read more about sedation dentistry options.",
        links: [{ href: "/sedation-dentistry", label: "sedation dentistry" }],
      },
    ],
    sources: [{"label": "ADA: Implants", "url": "https://www.mouthhealthy.org/all-topics-a-z/implants"}],
    relatedSlugs: ["tooth-extractions", "platelet-rich-fibrin", "sedation-dentistry", "wisdom-teeth"],
    nearbyLinks: [
      { href: "/sedation-dentistry", label: "Comfort & sedation" },
      { href: "/wisdom-teeth", label: "Wisdom teeth" },
      { href: "/meet-dr-narodovich", label: "Meet Dr. Narodovich" },
    ],
  },
  {
    slug: "dentures",
    title: "Full & Partial Dentures in Antelope & Sacramento",
    searchTitle: "Dentures in Antelope & Sacramento | Full & Partial",
    searchDescription:
      "Full and partial dentures to replace missing teeth at Sacramento Dental Medicine in Antelope, with implants or bridges compared. Call (916) 727-6453.",
    navLabel: "Dentures",
    eyebrow: "Restorative dentistry",
    description:
      "Full and partial dentures to replace missing teeth at Sacramento Dental Medicine in Antelope, with implant and bridge options explained at your exam.",
    intro:
      "Dentures replace missing teeth with a removable appliance: a full denture when all the teeth in an arch are missing, or a partial when some natural teeth remain. The team evaluates your gums, remaining teeth, and bone, and explains whether implants or a bridge could be an option for you too.",
    benefits: [
      "Full dentures for a complete arch",
      "Partial dentures that work with remaining teeth",
      "Implant and bridge options explained",
      "Fit checks and adjustments as your mouth changes",
    ],
    steps: [
      {
        title: "Evaluate your mouth",
        body: "An exam and appropriate imaging show the health of your gums, remaining teeth, and bone.",
      },
      {
        title: "Choose the approach",
        body: "Compare a full or partial denture with implant or bridge options, including what each involves and costs.",
      },
      {
        title: "Fit and adjust",
        body: "Your denture is fitted, then adjusted at follow-up visits as you get used to eating and speaking with it.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between full and partial dentures?",
        answer:
          "A full denture replaces all the teeth in the upper or lower jaw. A partial denture replaces some missing teeth and attaches to the natural teeth that remain.",
      },
      {
        question: "Can implants help hold a denture in place?",
        answer:
          "In some cases. Whether dental implants are an option depends on your bone, health, and goals. The exam and 3D imaging help the dentist explain what is possible for you.",
        links: [{ href: "/dental-implants", label: "dental implants" }],
      },
      {
        question: "How long does it take to get used to new dentures?",
        answer:
          "Most people need some time to adjust to eating and speaking with new dentures, and sore spots are common at first. Follow-up visits let the dentist adjust the fit.",
      },
      {
        question: "Do I still need dental checkups with dentures?",
        answer:
          "Yes. Regular exams check the fit of the denture, the health of your gums and any remaining teeth, and include an oral cancer screening.",
        links: [{ href: "/preventive-care", label: "Regular exams" }],
      },
      {
        question: "How much do dentures cost?",
        answer:
          "The estimate depends on the type of denture, any extractions or other treatment needed first, and your insurance benefits. Ask for a treatment estimate after the dentist evaluates your mouth.",
      },
    ],
    sources: [
      { label: "ADA: Dentures", url: "https://www.mouthhealthy.org/all-topics-a-z/dentures" },
      { label: "ADA: Bridges", url: "https://www.mouthhealthy.org/all-topics-a-z/bridges" },
    ],
    relatedSlugs: ["dental-implants", "tooth-extractions", "dental-crowns"],
  },
  {
    slug: "gum-disease-treatment",
    title: "Gum Disease Treatment & Deep Cleaning in Antelope, CA",
    bookingLabel: "Request a gum evaluation",
    searchDescription:
      "Bleeding gums or questions about deep cleaning? Get a gum health evaluation in Antelope and find out whether scaling and root planing may be appropriate.",
    navLabel: "Gum disease treatment",
    eyebrow: "Periodontal care",
    description:
      "Get an evaluation and personalized gum disease treatment at Sacramento Dental Medicine in Antelope, serving the Sacramento area.",
    intro:
      "Bleeding or receding gums? At our Antelope office, the dentist checks your gums and measures the pockets around your teeth. If those findings point to gum disease, a deep cleaning (scaling and root planing) may help remove buildup below the gumline.",
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
        body: "Ask the dentist to show you the measurements and explain which areas need care. Before deciding on treatment, ask for a written estimate and whether a visit to a gum specialist would help.",
      },
      {
        title: "Maintain the result",
        body: "The plan includes professional follow-up and practical steps to support gum health at home.",
      },
    ],
    faqs: [
      { question: "How is a deep cleaning different from a regular cleaning?", answer: "Scaling and root planing is a deeper cleaning below the gumline used to treat gum disease. Gum measurements and an exam help determine whether routine cleaning or more focused periodontal care is appropriate." },
      { question: "Can gum disease be present without pain?", answer: "Yes. Gum disease is often painless. Bleeding, gum recession, persistent bad breath, or loose teeth can be warning signs, but an exam is needed to assess gum health." },
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
    sources: [{"label": "ADA: Gum disease", "url": "https://www.mouthhealthy.org/all-topics-a-z/gum-disease"}, {"label": "ADA: Scaling and root planing", "url": "https://www.mouthhealthy.org/all-topics-a-z/scaling-and-root-planing"}],
    relatedSlugs: ["preventive-care", "dental-crowns"],
  },
  {
    slug: "dental-emergencies",
    title: "Emergency dentist in Antelope, CA",
    searchTitle: "Emergency Dentist in Antelope, CA | Weekday & Evening Hours",
    searchDescription:
      "Call (916) 727-6453 for urgent dental care on Elverta Road in Antelope. Open weekdays, until 7 PM Wed and Thu. Same-day visits when available.",
    navLabel: "Dental emergencies",
    eyebrow: "Urgent dental care",
    description:
      "Call Sacramento Dental Medicine for urgent dental pain, swelling, a broken tooth, or a lost filling or crown in Antelope, CA.",
    intro:
      "Toothache, swelling or a broken tooth? Call our Elverta Road office before you travel. We see urgent cases on weekdays and offer same-day visits when space is available. Wednesdays and Thursdays we’re open until 7 PM.",
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
      { question: "Should I use the online scheduler for urgent dental pain?", answer: "Call (916) 727-6453 first for urgent dental pain or an injury. Do not wait for an online request to be reviewed when you need immediate guidance." },
      { question: "Are you open evenings or weekends for emergencies?", answer: "The office is open until 7 PM on Wednesday and Thursday and is closed Saturday and Sunday. Call to check the earliest available visit; the practice does not advertise 24-hour emergency coverage." },
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
    sources: [{ label: "ADA: Dental emergencies", url: "https://www.mouthhealthy.org/all-topics-a-z/dental-emergencies" }],
    relatedSlugs: ["tooth-extractions", "root-canal-therapy", "wisdom-teeth"],
  },
  {
  "slug": "root-canal-therapy",
  "title": "Root Canal Treatment in Antelope & Sacramento, CA",
  "navLabel": "Root canal treatment",
  "eyebrow": "Endodontic care",
  "description": "Explore root canal care at Sacramento Dental Medicine in Antelope, with endodontic specialist Dr. Lucas L. Sheppard. Call for a tooth-pain evaluation.",
  "intro": "Root canal treatment removes infected or damaged tissue inside a tooth, cleans and seals the canals, and can help preserve a tooth that would otherwise need removal. Sacramento Dental Medicine lists endodontic specialist Dr. Lucas L. Sheppard on its team for complex root canal care. An exam determines whether the tooth can be saved.",
  "benefits": [
    "Evaluate a painful or infected tooth",
    "Understand whether the natural tooth can be saved",
    "Discuss specialist care for complex cases",
    "Plan the final filling or crown after treatment"
  ],
  "steps": [
    {
      "title": "Diagnose the tooth",
      "body": "The dentist examines the tooth and uses appropriate imaging to understand the roots and surrounding tissues."
    },
    {
      "title": "Treat the inside of the tooth",
      "body": "If root canal treatment is recommended, the affected tissue is removed and the canals are cleaned, filled, and sealed. Discuss numbing and comfort concerns before treatment."
    },
    {
      "title": "Complete the restoration",
      "body": "A follow-up filling or crown protects the treated tooth. The dentist explains the restoration and follow-up your tooth needs."
    }
  ],
  "nearbyLinks": [{ "href": "/meet-dr-sheppard", "label": "Meet Dr. Sheppard" }],
  "faqs": [
    {
      "question": "Does a toothache always mean I need a root canal?",
      "answer": "No. Tooth pain can have several causes. An exam and appropriate imaging are needed to determine whether a filling, root canal treatment, extraction, or another approach fits the problem."
    },
    {
      "question": "Who provides specialist root canal care at the practice?",
      "answer": "Dr. Lucas L. Sheppard, DMD, is the endodontic specialist listed on the Sacramento Dental Medicine team. Call the office to ask about an evaluation and current specialist availability."
    },
    {
      "question": "Will I need a crown after a root canal?",
      "answer": "The tooth needs a final restoration after root canal treatment. A crown or filling may be recommended depending on the tooth and how much healthy structure remains."
    },
    {
      "question": "What should I do if my tooth hurts now?",
      "answer": "Call (916) 727-6453 to describe the problem and ask for the earliest available evaluation. Same-day visits are offered when possible; an online appointment request does not confirm a visit."
    }
  ],
  "relatedSlugs": [
    "dental-crowns",
    "dental-emergencies",
    "tooth-extractions"
  ],
  "sources": [
    {
      "label": "ADA: Root canals",
      "url": "https://www.mouthhealthy.org/all-topics-a-z/root-canals"
    }
  ]
},
  {
    slug: "wisdom-teeth",
    title: "Wisdom Teeth Removal in Antelope & Sacramento, CA",
    navLabel: "Wisdom teeth",
    eyebrow: "Oral surgery",
    description:
      "Get a wisdom teeth evaluation or removal at Sacramento Dental Medicine in Antelope, serving the Sacramento area. Call (916) 727-6453 or request a visit.",
    intro:
      "Wisdom teeth can stay quiet for years or start to crowd, inflame, or decay. Sacramento Dental Medicine evaluates them in-house and handles removal when that is the healthier next step. An exam and imaging show whether the teeth should be watched, treated, or removed, and whether a specialist should be involved.",
    benefits: [
      "Evaluate erupting, impacted, or painful wisdom teeth",
      "Understand whether removal is recommended now",
      "Plan a clear, in-house extraction visit when appropriate",
      "Discuss comfort options and after-care before treatment",
    ],
    steps: [
      {
        title: "Examine the teeth",
        body: "The dentist reviews symptoms and uses appropriate imaging to see the wisdom teeth, roots, and nearby structures.",
      },
      {
        title: "Review the recommendation",
        body: "You will hear whether watchful waiting, treatment, or removal is the safer path, and whether a specialist should be involved.",
      },
      {
        title: "Plan the visit and recovery",
        body: "If removal is recommended, the team explains what to expect, comfort options, and how to care for the area afterward.",
      },
    ],
    faqs: [
      {
        question: "Do all wisdom teeth need to be removed?",
        answer:
          "No. Some wisdom teeth stay healthy and have enough space. Others crowd, partially erupt, or become difficult to clean. An exam and imaging determine whether removal is recommended.",
      },
      {
        question: "Can wisdom teeth be removed at this office?",
        answer:
          "Yes. Sacramento Dental Medicine lists wisdom teeth removal among its in-house oral surgery services. Complex cases may be coordinated with a specialist when that is the safer plan.",
      },
      {
        question: "What should I do if a wisdom tooth hurts now?",
        answer:
          "Call (916) 727-6453 to describe the pain or swelling and ask about the earliest available evaluation. Same-day visits are offered when possible. See Dental emergencies for urgent pain or swelling.",
        links: [{ href: "/dental-emergencies", label: "Dental emergencies" }],
      },
      {
        question: "Will I be numb for wisdom teeth removal?",
        answer:
          "Local numbing is part of extraction care. Tell the team about anxiety or comfort concerns so they can explain the options that may be appropriate for your health and the procedure. Learn more about sedation dentistry options.",
        links: [{ href: "/sedation-dentistry", label: "sedation dentistry" }],
      },
      {
        question: "What is recovery like after wisdom teeth removal?",
        answer:
          "If removal is recommended, the team explains what to expect, comfort options, and how to care for the area afterward.",
      },
    ],
    sources: [
      {
        label: "ADA: Wisdom teeth",
        url: "https://www.mouthhealthy.org/all-topics-a-z/wisdom-teeth",
      },
    ],
    relatedSlugs: ["tooth-extractions", "sedation-dentistry", "platelet-rich-fibrin", "dental-emergencies"],
  },
  {
    slug: "platelet-rich-fibrin",
    title: "PRF & Grafting in Antelope & Sacramento, CA",
    navLabel: "PRF & grafting",
    eyebrow: "Oral surgery",
    description:
      "Ask about platelet rich fibrin (PRF) and grafting support after an extraction or implant plan at Sacramento Dental Medicine in Antelope, CA.",
    intro:
      "Platelet rich fibrin (PRF) is listed among the practice's oral surgery services. It is prepared from a small sample of your own blood and may be placed at a surgical site when the dentist recommends extra support after an extraction or as part of a grafting plan. The exam determines whether PRF, grafting, both, or neither is appropriate. This page does not promise a specific healing time or outcome.",
    benefits: [
      "Discuss PRF when planning an extraction or implant site",
      "Understand whether grafting support is recommended",
      "Use material prepared from your own blood when PRF is chosen",
      "Leave with clear after-care instructions",
    ],
    steps: [
      {
        title: "Evaluate the site",
        body: "The dentist examines the tooth or implant site and uses appropriate imaging to understand the bone and surrounding tissues.",
      },
      {
        title: "Review PRF or grafting",
        body: "If extra support may help the site, the team explains what PRF or grafting would involve and why it is being considered for your case.",
      },
      {
        title: "Plan the visit",
        body: "You will know what to expect on the day of treatment, including any blood draw for PRF, and how to care for the area afterward.",
      },
    ],
    faqs: [
      {
        question: "What is platelet rich fibrin (PRF)?",
        answer:
          "PRF is a fibrin material prepared from a small sample of your own blood. Dentists may place it at a surgical site to support the local healing environment. Whether it is used depends on the procedure and the dentist's recommendation.",
      },
      {
        question: "Do you offer bone grafting?",
        answer:
          "Grafting needs are evaluated case by case, often after an extraction or when planning an implant. The dentist will explain whether grafting, PRF, both, or neither is recommended for your site.",
      },
      {
        question: "Does PRF guarantee faster healing?",
        answer:
          "No. PRF may be used to support a healing site, but results vary and no specific healing time or outcome is promised. Ask the dentist what to expect for your procedure.",
      },
      {
        question: "Is PRF right for every extraction?",
        answer:
          "No. Many extractions do not need PRF or grafting. The recommendation follows an exam of the tooth, bone, and your health history.",
      },
    ],
    relatedSlugs: ["tooth-extractions", "wisdom-teeth", "dental-implants"],
  },
];

export const highlightedServiceSlugs = [
  "root-canal-therapy",
  "wisdom-teeth",
  "platelet-rich-fibrin",
  "dental-implants",
] as const;

export const servicePageBySlug = new Map(
  servicePages.map((service) => [service.slug, service]),
);

/** The title and description a service page sends to search and social. */
export function serviceSearchCopy(service: ServicePage) {
  return {
    title: service.searchTitle ?? service.title,
    description: service.searchDescription ?? service.description,
  };
}
