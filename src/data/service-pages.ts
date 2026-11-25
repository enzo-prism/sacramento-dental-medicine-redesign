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
    title: "Dental Services in Antelope & Sacramento, CA",
    searchTitle: "Dental Services in Antelope & Sacramento | All Care",
    searchDescription:
      "Preventive checkups, cosmetic dentistry, implants, root canals, and oral surgery under one roof in Antelope. Book online or call (916) 727-6453.",
    navLabel: "Dental services",
    eyebrow: "Complete dental care",
    description:
      "Preventive, cosmetic, restorative, orthodontic, endodontic, and oral surgery care under one roof on Elverta Rd in Antelope.",
    intro:
      "Whether you need a routine cleaning, a child's first checkup, cosmetic veneers, a crown, a specialist root canal, or wisdom teeth removed, we bring full-scope care into one neighborhood office on Elverta Road. Every visit starts with a straightforward exam and an honest conversation—never a sales pitch.",
    benefits: [
      "Routine exams, cleanings, kids' checkups, and gum therapy",
      "Teeth whitening, bonding, porcelain veneers, and Invisalign",
      "Crowns, bridges, implants, dentures, and in-house root canals",
      "Extractions, wisdom teeth removal, and PRF or bone grafting",
    ],
    steps: [
      {
        title: "Tell us what matters most",
        body: "Start by sharing what brought you in, what you want to change, and any past visits that made you nervous.",
      },
      {
        title: "See the whole picture",
        body: "We examine your teeth and gums, take digital X-rays or 3D imaging when needed, and show you what's happening on screen.",
      },
      {
        title: "Move at your own pace",
        body: "We separate urgent fixes from optional work so you can plan treatment around your health, comfort, and schedule.",
      },
    ],
    faqs: [
      {
        question: "What dental services do you provide at the Antelope office?",
        answer:
          "We provide exams and cleanings, children's dentistry, gum disease treatment, custom night guards, teeth whitening, bonding, porcelain veneers, Invisalign and orthodontics, crowns and bridges, dental implants, full and partial dentures, root canal therapy with our in-house endodontist Dr. Sheppard, tooth extractions, wisdom teeth removal, PRF and bone grafting, anxious-patient comfort planning, and urgent dental care.",
      },
      {
        question: "Where is Sacramento Dental Medicine located?",
        answer:
          "Our only office is at 4320 Elverta Rd #3, Antelope, CA 95843. Patients visit us from Antelope, Sacramento, Roseville, Citrus Heights, North Highlands, and Folsom.",
      },
      {
        question: "Are you accepting new patients?",
        answer:
          "Yes. We welcome new patients of all ages—from a baby's first checkup around age one to adults returning after years away from the dentist.",
      },
      {
        question: "Can I book an exam first before deciding on treatment?",
        answer:
          "Always. An exam is where we gather facts, answer your questions, and give you a written estimate so you can decide what makes sense on your own timeline.",
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
    title: "Dental Exams & Teeth Cleanings in Antelope & Sacramento",
    searchTitle: "Teeth Cleaning & Dental Exam | Antelope & Sacramento",
    searchDescription:
      "Thorough dental exams, gentle cleanings, digital X-rays, fluoride, and sealants in Antelope, serving Sacramento. Call (916) 727-6453 to book.",
    navLabel: "Exams & cleanings",
    eyebrow: "Preventive care",
    description:
      "Thorough exams, gentle cleanings, digital X-rays, oral cancer screenings, fluoride, and sealants for all ages in Antelope.",
    intro:
      "The easiest dental problem to fix is the one we catch early. A preventive visit at our Elverta Road office combines a thorough exam, a gentle cleaning to clear away plaque and tartar, an oral cancer screening, digital X-rays only when needed, and fluoride or sealants when they make sense for your teeth.",
    benefits: [
      "Gentle removal of plaque and hardened tartar buildup",
      "Early detection of cavities, gum inflammation, and wear",
      "Low-radiation digital X-rays taken only when clinically useful",
      "Routine oral cancer screening included at checkups",
    ],
    steps: [
      {
        title: "Catch up on your health",
        body: "We review changes in your health, medications, sensitive spots, and anything you'd like us to look at closely.",
      },
      {
        title: "Clean and check every surface",
        body: "We gently clean your teeth, check gums and soft tissue, and take digital X-rays only when we need to see beneath the surface.",
      },
      {
        title: "Leave knowing where things stand",
        body: "Before you step out of the chair, we show you what we found, share practical home tips, and recommend the right recall schedule.",
      },
    ],
    nearbyLinks: [{ href: "/new-patients", label: "What to bring to your first visit" }],
    faqs: [
      {
        question: "What happens during a dental checkup and cleaning?",
        answer:
          "We gently remove plaque and tartar, polish your teeth, check your teeth and gums for early decay or wear, perform an oral cancer screening, and take digital X-rays if needed. Afterward, we review our findings with you in plain language.",
      },
      {
        question: "How often should I schedule a dental cleaning?",
        answer:
          "Most healthy adults and kids do well coming in every six months, though we tailor the schedule to your gum health and cavity risk. Patients being treated for gum disease often benefit from more frequent maintenance visits.",
        links: [{ href: "/gum-disease-treatment", label: "treated for gum disease" }],
      },
      {
        question: "Do you take X-rays at every single checkup?",
        answer:
          "No. We only take X-rays when we need to check areas an exam alone cannot see, like decay between teeth or bone levels around roots. Our digital sensors use a fraction of the radiation of traditional film.",
      },
      {
        question: "It has been years since my last cleaning. Will I get lectured?",
        answer:
          "Never. People come back to us after years away all the time, and many ask specifically for Dr. Narodovich by name. We focus on where your teeth are today and build a realistic plan forward—no guilt, no scolding.",
        links: [{ href: "/meet-dr-narodovich", label: "Dr. Narodovich" }],
      },
      {
        question: "Do you accept Medi-Cal for cleanings?",
        answer:
          "We do not accept Medi-Cal. If you have another dental plan, call (916) 727-6453 and our front desk will confirm whether it is accepted before your visit.",
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
    title: "Kids & Family Dentist in Antelope & Sacramento, CA",
    searchTitle: "Kids & Family Dentist | Antelope & Sacramento, CA",
    searchDescription:
      "Friendly children's dentistry in Antelope, serving Sacramento & Roseville. First visits around age one, cleanings & fluoride: (916) 727-6453.",
    navLabel: "Children's dentistry",
    eyebrow: "Family dentistry",
    description:
      "Patient, friendly dental checkups for children and teens at our Antelope family office, starting with a relaxed first visit around age one.",
    intro:
      "Kids are welcome in the very same Antelope office as parents and grandparents. We encourage a relaxed, no-pressure first visit around age one so Dr. Narodovich can count baby teeth, answer your questions about home habits, and help your child grow up seeing the dentist as a friendly place. As kids grow, visits add gentle cleanings, fluoride, sealants, and X-rays only when needed.",
    benefits: [
      "A relaxed, no-pressure first visit around age one",
      "Gentle cleanings, fluoride, and protective sealants as kids grow",
      "Practical brushing and flossing coaching for kids and parents",
      "Early bite and jaw growth check around age seven",
    ],
    steps: [
      {
        title: "Make the first hello easy",
        body: "Early visits stay short and upbeat—a gentle visual check of baby teeth plus time to talk with you about feeding, habits, and brushing.",
      },
      {
        title: "Protect growing smiles",
        body: "As your child gets older, we introduce gentle cleanings, fluoride, and sealants, adding digital X-rays only when clinically helpful.",
      },
      {
        title: "Keep an eye on bite growth",
        body: "Around age seven, we check how permanent teeth and jaws are coming in so anything worth guiding early is spotted in time.",
      },
    ],
    faqs: [
      {
        question: "When should my child have their first dental visit?",
        answer:
          "We encourage bringing your child in around their first birthday. That first visit is a gentle meet-and-greet: Dr. Narodovich counts baby teeth, checks early development, and shares practical tips for keeping young teeth healthy at home.",
      },
      {
        question: "Can my whole family come to the same office?",
        answer:
          "Yes. We treat patients of all ages right here on Elverta Road, so kids, teens, parents, and grandparents can all see the same familiar team.",
      },
      {
        question: "When should my child's bite be checked for braces?",
        answer:
          "Around age seven, we perform an early orthodontic check to see how teeth and jaws are developing. Habits like thumb sucking or tongue thrusting are often simpler to address while a child is still growing, though not every child needs early treatment.",
        links: [{ href: "/orthodontics", label: "early orthodontic check" }],
      },
      {
        question: "What if my child is shy or nervous at the dentist?",
        answer:
          "Give us a heads-up when you book. We move slowly, explain everything in kid-friendly words, and never rush or surprise a nervous child so early visits build lasting confidence.",
      },
      {
        question: "What should I do if my child chips or knocks out a tooth?",
        answer:
          "Treat it as a dental emergency and call (916) 727-6453 right away so we can tell you what to do next and check availability. If there is a head injury, uncontrolled bleeding, or trouble breathing, call 911 immediately.",
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
    searchTitle: "Cosmetic Dentist Antelope & Sacramento | Veneers & More",
    searchDescription:
      "Natural-looking teeth whitening, bonding, porcelain veneers, and Invisalign in Antelope, serving Sacramento & Roseville. Call (916) 727-6453.",
    navLabel: "Cosmetic dentistry",
    eyebrow: "Cosmetic dentistry",
    description:
      "Professional whitening, tooth-colored bonding, porcelain veneers, and Invisalign tailored to your face and bite in Antelope.",
    intro:
      "Great cosmetic dentistry never looks overdone—it simply looks like your healthiest, most confident smile. Dr. Michael Narodovich plans whitening, tooth-colored bonding, porcelain veneers, and Invisalign around your natural facial features and bite, starting with the most conservative option that delivers the change you actually want.",
    benefits: [
      "In-office or take-home professional teeth whitening",
      "Tooth-colored bonding to smooth chips and small gaps",
      "Custom porcelain veneers for shape, proportion, and shade",
      "Invisalign clear aligners to straighten crowding or spacing",
    ],
    steps: [
      {
        title: "Talk through what you want to change",
        body: "Tell us what catches your eye in photos, how subtle or noticeable a change you want, and any timeline you're working toward.",
      },
      {
        title: "Check the foundation first",
        body: "We check teeth, gums, and bite wear so any cavities, gum inflammation, or grinding are addressed before cosmetic work begins.",
      },
      {
        title: "Weigh conservative options",
        body: "We walk through which treatments fit best—from simplest to most comprehensive—along with expected steps and a written estimate.",
      },
    ],
    nearbyLinks: [{ href: "/meet-dr-narodovich", label: "Meet Dr. Narodovich" }],
    faqs: [
      {
        question: "How do I know which cosmetic treatment fits my smile?",
        answer:
          "It comes down to what you want to change. Whitening brightens natural enamel, bonding fixes small chips or gaps, veneers reshape size and color together, and Invisalign moves teeth into better alignment. We'll help you compare them after an exam.",
      },
      {
        question: "What is dental bonding?",
        answer:
          "Bonding uses carefully shade-matched composite resin sculpted directly onto a tooth to repair chips, worn edges, or small spaces. It preserves more natural tooth structure than a veneer or crown.",
      },
      {
        question: "Does dental insurance cover cosmetic dentistry?",
        answer:
          "Most dental plans do not cover purely cosmetic procedures. Call our front desk at (916) 727-6453 to verify your benefits and ask about current payment options.",
      },
      {
        question: "Should I get a cleaning or fix cavities before cosmetic work?",
        answer:
          "Yes—we almost always start with a checkup and cleaning and treat any active decay or gum issues first. Healthy teeth and gums help cosmetic work look better and last far longer.",
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
    searchTitle: "Professional Teeth Whitening | Antelope & Sacramento",
    searchDescription:
      "Dentist-supervised in-office and take-home teeth whitening in Antelope, serving Sacramento, tailored for sensitive teeth. Call (916) 727-6453.",
    navLabel: "Teeth whitening",
    eyebrow: "Cosmetic dentistry",
    description:
      "Dentist-supervised in-office or take-home teeth whitening in Antelope, checked first for tooth health, sensitivity, and existing restorations.",
    intro:
      "Coffee, tea, red wine, and everyday life gradually dull natural enamel. We offer both in-office whitening and take-home kits, always starting with an exam so we can protect sensitive teeth, check for cavities or gum irritation, and plan around any crowns or fillings that won't lighten.",
    benefits: [
      "Choose in-office brightening or take-home whitening kits",
      "Exam first to confirm whitening is safe and effective for your stains",
      "Thoughtful adjustments if your teeth run sensitive",
      "Smart planning around existing crowns, fillings, or veneers",
    ],
    steps: [
      {
        title: "Identify the stain type",
        body: "We look at what's causing discoloration—surface stains respond well to whitening, while deeper shade changes or old fillings need a tailored plan.",
      },
      {
        title: "Pick the right format",
        body: "Choose between in-office whitening or take-home kits depending on your schedule, sensitivity, and how quickly you want results.",
      },
      {
        title: "Keep your shade bright",
        body: "We share practical advice on staining foods, daily care, and when an occasional touch-up makes sense.",
      },
    ],
    faqs: [
      {
        question: "Why choose dentist-supervised whitening over store strips?",
        answer:
          "Before brightening, we make sure your teeth and gums are healthy and confirm your discoloration is the kind whitening can actually lift. You also get guidance for sensitivity and uneven shades, though exact results always vary from person to person.",
      },
      {
        question: "Will whitening lighten my crowns, fillings, or veneers?",
        answer:
          "No—whitening only changes natural enamel, so crowns, tooth-colored fillings, and veneers stay their original shade. We plan around visible work ahead of time or talk through matching options afterward.",
        links: [{ href: "/veneers", label: "veneers" }],
      },
      {
        question: "Does professional whitening make teeth sensitive?",
        answer:
          "Temporary sensitivity can happen during or right after whitening. Let us know if cold drinks already bother your teeth so we can adjust the pace and method.",
      },
      {
        question: "How long do teeth whitening results last?",
        answer:
          "It varies with everyday habits. Coffee, tea, red wine, and tobacco bring stains back faster, while steady brushing, regular cleanings, and occasional touch-ups help keep teeth brighter longer.",
      },
      {
        question: "How much does teeth whitening cost?",
        answer:
          "Cost depends on whether you choose in-office whitening or a take-home kit. Because whitening is usually considered cosmetic, call (916) 727-6453 for current pricing and plan questions.",
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
      "Custom porcelain veneers designed around your face and bite by Dr. Narodovich in Antelope. Compare veneers, bonding, and whitening first.",
    navLabel: "Porcelain veneers",
    eyebrow: "Cosmetic dentistry",
    description:
      "Custom porcelain veneers shaped around your natural features and bite by Dr. Narodovich in Antelope, with conservative options compared honestly.",
    intro:
      "Porcelain veneers are thin, custom-crafted shells bonded to the front of teeth to refine their shape, length, spacing, or shade. Dr. Narodovich designs veneers around your face and bite—and he'll tell you straight if whitening, bonding, or clear aligners can get you there with less change to your natural enamel.",
    benefits: [
      "Refine the shape, length, spacing, and shade of front teeth",
      "Mask chips, worn edges, and deep stains whitening cannot lift",
      "Proportioned to your face and bite—never bulky or unnatural",
      "Honest side-by-side comparison with more conservative options",
    ],
    steps: [
      {
        title: "Design around your face",
        body: "We talk through your goals, check your gums and bite forces, and confirm whether veneers are truly the best tool for the job.",
      },
      {
        title: "Prepare and capture detail",
        body: "A thin layer of enamel is typically shaped so veneers sit flush and natural, then precise impressions or digital scans go to the lab.",
      },
      {
        title: "Bond and fine-tune your bite",
        body: "Once your custom porcelain veneers return, we check shade and fit carefully, bond them securely, and balance your bite.",
      },
    ],
    nearbyLinks: [{ href: "/meet-dr-narodovich", label: "Meet Dr. Narodovich" }],
    faqs: [
      {
        question: "Are porcelain veneers reversible?",
        answer:
          "Usually no. Placing porcelain veneers typically involves removing a thin layer of enamel so they sit naturally, making the commitment permanent. Veneers can also wear or chip over time and may eventually need replacement.",
      },
      {
        question: "Who is a good candidate for porcelain veneers?",
        answer:
          "Adults with healthy teeth and gums who want to improve the shape, size, or shade of front teeth. Active cavities, gum disease, or heavy grinding should generally be managed first so veneers stay protected.",
        links: [{ href: "/bruxism", label: "heavy grinding" }],
      },
      {
        question: "What are the alternatives to veneers?",
        answer:
          "Depending on your goals, Whitening can brighten shade alone, bonding repairs minor chips and gaps, Invisalign aligns crowded or spaced teeth, and crowns reinforce heavily damaged teeth. We'll walk through which approach makes the most sense for you.",
        links: [
          { href: "/teeth-whitening", label: "Whitening" },
          { href: "/invisalign", label: "Invisalign" },
        ],
      },
      {
        question: "How much do porcelain veneers cost?",
        answer:
          "Your estimate depends on how many teeth are involved and whether any foundational care is needed first. Because veneers are typically cosmetic, ask our front desk about current payment options after your consultation.",
      },
    ],
    sources: [{ label: "ADA: Veneers", url: "https://www.mouthhealthy.org/all-topics-a-z/veneers" }],
    relatedSlugs: ["cosmetic", "teeth-whitening", "dental-crowns"],
  },
  {
    slug: "bruxism",
    title: "Teeth Grinding & Custom Night Guards in Antelope, CA",
    searchTitle: "Teeth Grinding & Night Guards | Antelope & Sacramento",
    searchDescription:
      "Sore jaw, morning headaches, or worn teeth? Get checked for bruxism and fitted for a custom night guard in Antelope, serving Sacramento.",
    navLabel: "Teeth grinding & night guards",
    eyebrow: "Preventive care",
    description:
      "Bruxism exams and custom-fitted night guards in Antelope to protect enamel, crowns, veneers, and tired jaw muscles while you sleep.",
    intro:
      "Waking up with a tight jaw, dull morning headaches, or newly sensitive teeth often points to nighttime grinding or clenching—known as bruxism. We examine your teeth and jaw muscles for hidden wear or hairline cracks and can make a custom-fitted night guard to cushion your bite while you sleep.",
    benefits: [
      "Pinpoint hidden enamel wear, hairline cracks, and jaw strain",
      "Custom-fitted night guards made specifically for your bite",
      "Shield natural teeth, crowns, fillings, and porcelain veneers",
      "Practical guidance on everyday triggers that worsen clenching",
    ],
    steps: [
      {
        title: "Spot the wear pattern",
        body: "We check for flattened biting edges, chipped enamel, sensitivity, and tenderness along your jaw muscles.",
      },
      {
        title: "Fit a custom guard",
        body: "If a night guard makes sense, we take an accurate scan or impression so your guard sits comfortably and stays put overnight.",
      },
      {
        title: "Protect your bite long term",
        body: "We check your guard and enamel at routine visits and repair any already-cracked or worn teeth if needed.",
      },
    ],
    faqs: [
      {
        question: "How can I tell if I grind my teeth in my sleep?",
        answer:
          "Tell-tale clues include morning jaw soreness, tension headaches, teeth that look flat or chipped at the edges, sudden sensitivity, or a partner hearing grinding overnight. Many people only find out when we spot the wear during an exam.",
      },
      {
        question: "Why get a custom night guard instead of a store-bought one?",
        answer:
          "A custom guard is molded directly to your teeth, so it fits snugly, breathes easier, and stays comfortable all night—unlike bulky boil-and-bite trays. We'll recommend the style that best protects your bite.",
      },
      {
        question: "What causes nighttime teeth grinding?",
        answer:
          "Stress, anxiety, sleep disruptions, and how upper and lower teeth meet all play a role. Alongside wearing a guard, cutting back on evening caffeine or alcohol and winding down before bed can ease clenching.",
      },
      {
        question: "Can grinding really crack or ruin my teeth?",
        answer:
          "Yes. Night after night of heavy clenching wears down enamel, fractures fillings, and can split teeth. When a tooth is badly worn or cracked, it may eventually need a crown to hold it together.",
        links: [{ href: "/dental-crowns", label: "need a crown" }],
      },
      {
        question: "Does dental insurance cover a custom night guard?",
        answer:
          "Some dental plans include partial coverage for night guards. Call (916) 727-6453 and our front desk will check your plan and share current exam and guard costs.",
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
    title: "Dental Crowns & Bridges in Antelope & Sacramento",
    searchTitle: "Dental Crowns Sacramento & Antelope | Cracked Tooth Repair",
    searchDescription:
      "Cracked, broken, or worn tooth? Book a crown exam on Elverta Rd in Antelope for an honest plan and estimate. Call (916) 727-6453.",
    navLabel: "Dental crowns",
    eyebrow: "Restorative dentistry",
    description:
      "Custom dental crowns and bridges in Antelope to reinforce cracked or weakened teeth and restore natural chewing strength.",
    intro:
      "When a tooth is cracked, heavily filled, worn down, or finished with a root canal, a filling alone often can't protect it. A custom crown covers and reinforces the tooth so you can chew normally again—and we also craft dental bridges to span missing teeth when that's the right fit.",
    benefits: [
      "Reinforce cracked, fractured, or heavily filled teeth",
      "Restore natural chewing strength without wincing",
      "Protect a tooth after root canal therapy",
      "Shade-matched to blend in with neighboring teeth",
    ],
    steps: [
      {
        title: "Check tooth and root health",
        body: "We examine the tooth and take digital X-rays or 3D imaging if needed to make sure the root and bone can support a crown.",
      },
      {
        title: "Walk through your options",
        body: "We show you what we found, explain whether a filling, crown, or replacement makes the most sense, and provide a written estimate.",
      },
      {
        title: "Fit a lasting restoration",
        body: "We shape the tooth gently, capture precise measurements, and place a custom crown checked carefully for comfort and bite.",
      },
    ],
    faqs: [
      {
        question: "Do you offer dental bridges too?",
        answer:
          "Yes. A bridge fills the space of one or more missing teeth using a replacement tooth anchored to crowns on neighboring teeth. At your exam, we'll compare a bridge alongside an implant or a partial denture so you can weigh the pros and cons.",
        links: [
          { href: "/dental-implants", label: "an implant" },
          { href: "/dentures", label: "a partial denture" },
        ],
      },
      {
        question: "How is a dental crown different from a dental implant?",
        answer:
          "A crown caps and protects the visible part of a natural tooth you still have. An implant replaces a missing tooth root and then holds a crown on top. Your exam shows whether we can save your natural tooth or should look at replacement.",
      },
      {
        question: "How much does a dental crown cost?",
        answer:
          "Your cost depends on the tooth, the restoration material, any underlying treatment needed, and your insurance benefits. Call our front desk about exam fees and we'll prepare a written treatment estimate after checking the tooth.",
      },
      {
        question: "How do I know if my tooth needs a crown?",
        answer:
          "We often recommend a crown when a tooth is cracked, badly worn, heavily filled, or too weakened for a standard filling to hold. Seeing the tooth and an X-ray is the only sure way to know.",
      },
      {
        question: "Can a crown save a broken tooth?",
        answer:
          "Often, yes. Saving a broken tooth depends on how much solid structure remains above the gumline and whether the root and surrounding bone are healthy.",
      },
    ],
    sources: [
      { label: "ADA: Crowns", url: "https://www.mouthhealthy.org/all-topics-a-z/crowns" },
      { label: "ADA: Bridges", url: "https://www.mouthhealthy.org/all-topics-a-z/bridges" },
    ],
    relatedSlugs: ["dental-implants", "tooth-extractions"],
  },
  {
    slug: "sedation-dentistry",
    title: "Sedation Dentistry for Nervous Patients in Antelope, CA",
    bookingLabel: "Book a comfort consultation",
    searchTitle: "Sedation Dentistry Antelope & Sacramento | Calm Care",
    searchDescription:
      "Anxious about the dentist? Our Antelope office serves Sacramento with an unhurried pace, The Wand STA numbing, and sedation planning: (916) 727-6453.",
    navLabel: "Comfort & sedation",
    eyebrow: "Anxious-patient care",
    description:
      "Calm, unhurried dentistry for anxious patients on Elverta Rd in Antelope—with computer-guided numbing and honest sedation planning.",
    intro:
      "If past dental visits left you gripping the armrests—or avoiding the chair altogether—tell us what made them tough. Here in Antelope, we slow the pace, explain every step before we begin, and use The Wand STA for gentle, computer-guided local numbing. If you're interested in sedation, we'll review your medical history and walk you through what's available and safe for your procedure.",
    benefits: [
      "Zero lectures—even if it's been years since your last visit",
      "Every step explained before anything happens",
      "The Wand STA computer-guided local numbing for gentler anesthesia",
      "Sedation choices reviewed carefully around your health and procedure",
    ],
    steps: [
      {
        title: "Tell us what makes you uneasy",
        body: "Whether it's needles, sensitivity, a strong gag reflex, or a rough past appointment, sharing it upfront lets us tailor the entire visit.",
      },
      {
        title: "Map out a comfort plan",
        body: "We review your health history, medications, and planned care so we can confirm which numbing or sedation options fit safely.",
      },
      {
        title: "Stay in control the whole time",
        body: "We check in often, pause whenever you raise a hand, and never push faster than you're comfortable going.",
      },
    ],
    faqs: [
      {
        question: "What should I bring or share before considering sedation?",
        answer:
          "Bring an up-to-date list of medications and tell us about allergies, medical conditions, past reactions to anesthesia, and the dental work you're considering. We'll confirm which options are available here in Antelope, who oversees your care, and any prep or ride-home requirements.",
      },
      {
        question: "How is the cost of comfort or sedation care estimated?",
        answer:
          "Ask our front desk which comfort measures are included and whether any sedation service carries a separate fee. Because safety comes first, the dentist reviews your health history and treatment plan before confirming an option and written estimate.",
      },
      {
        question: "Which sedation options can I ask about?",
        answer:
          "Call (916) 727-6453 to ask which options are currently available for your visit. A dentist reviews your health history and procedure before confirming whether sedation is right for you, and we're happy to explain consultation fees and give you a written estimate upfront.",
      },
      {
        question: "Is local numbing the same thing as sedation?",
        answer:
          "No—local anesthesia numbs the specific tooth and area being treated (we use computer-guided delivery with The Wand STA to make it gentler), while sedation helps ease anxiety or awareness. We'll explain both so you know what to expect.",
      },
      {
        question: "Can we talk about comfort options before booking treatment?",
        answer:
          "Absolutely. Let us know when you book that anxiety is part of your visit. Starting with a calm exam and conversation—with no treatment that day unless you want it—is a great first step.",
      },
      {
        question: "What if I haven't seen a dentist in years?",
        answer:
          "You're in good company—many of our favorite patients came to us after years away. We focus only on helping you feel comfortable today and taking things one manageable step at a time.",
      },
    ],
    sources: [{ label: "ADA: Anesthesia and sedation", url: "https://www.mouthhealthy.org/all-topics-a-z/anesthesia-and-sedation" }],
    nearbyLinks: [{ href: "/meet-dr-narodovich", label: "Meet Dr. Narodovich" }],
    relatedSlugs: ["dental-crowns", "tooth-extractions"],
  },
  {
    slug: "orthodontics",
    title: "Orthodontics & Clear Aligners in Antelope, CA",
    searchTitle: "Orthodontics & Clear Aligners in Antelope & Sacramento",
    searchDescription:
      "Bite and alignment exams, kids' early checks around age seven, and Invisalign clear aligners in Antelope. Book online or call (916) 727-6453.",
    navLabel: "Orthodontics",
    eyebrow: "Straighter smiles",
    description:
      "Bite and alignment evaluations, early kids' orthodontic checks, and Invisalign clear aligner planning at our Antelope office.",
    intro:
      "Straighter teeth aren't just about how your smile looks in photos—better alignment makes brushing and flossing easier and helps your bite wear evenly over decades. We evaluate alignment and bite for teens and adults, offer Invisalign clear aligners, and let you know honestly when another orthodontic approach is the smarter choice.",
    benefits: [
      "Thorough evaluation of crowding, spacing, and bite balance",
      "Invisalign clear aligner planning right in Antelope",
      "Early bite checks for growing children around age seven",
      "Straight talk on alternatives if aligners aren't the right fit",
    ],
    steps: [
      {
        title: "Check alignment and bite",
        body: "We look closely at crowding, gaps, enamel wear, and how your upper and lower teeth meet when you chew.",
      },
      {
        title: "Compare the right paths",
        body: "We'll tell you honestly whether clear aligners can achieve your goals or if another orthodontic option would serve you better.",
      },
      {
        title: "Map out each milestone",
        body: "If you decide to move forward, we outline the wear schedule, expected check-ins, and retention plan before you start.",
      },
    ],
    faqs: [
      {
        question: "How are orthodontics and Invisalign related?",
        answer:
          "Orthodontics covers all treatments that move teeth and align your bite, and Invisalign is one clear-aligner method within it. We provide Invisalign evaluations here and tell you frankly if aligners or another orthodontic approach fits your bite best.",
      },
      {
        question: "Do you offer Invisalign in Antelope and Greater Sacramento?",
        answer:
          "Yes—we offer Invisalign clear aligners right at our Elverta Road office. An exam and bite check confirm whether clear aligners are a good match for your teeth.",
      },
      {
        question: "Are clear aligners right for every bite issue?",
        answer:
          "No. While clear aligners handle many crowding and spacing cases well, more complex jaw or bite corrections sometimes do better with another orthodontic approach. We'll give you an honest recommendation after examining your bite.",
      },
      {
        question: "At what age should a child have an orthodontic check?",
        answer:
          "We recommend an early bite check around age seven as part of our children's dentistry visits. Watching jaw and tooth growth early helps us spot habits or crowding while they are simpler to guide.",
        links: [{ href: "/dental-care-children", label: "children's dentistry" }],
      },
      {
        question: "How much does orthodontic treatment or Invisalign cost?",
        answer:
          "Cost depends on your specific bite, expected treatment length, and any orthodontic benefits in your dental plan. We provide a written estimate after examining your alignment and bite.",
      },
    ],
    sources: [{ label: "ADA: Braces and aligners", url: "https://www.mouthhealthy.org/all-topics-a-z/braces" }],
    relatedSlugs: ["invisalign", "dental-crowns"],
  },
  {
    slug: "invisalign",
    title: "Invisalign Clear Aligners in Antelope & Sacramento",
    searchTitle: "Invisalign in Sacramento & Antelope | Is It Right for You?",
    searchDescription:
      "Find out if Invisalign clear aligners fit your teeth and bite at an Antelope exam, with a written estimate based on your plan and benefits.",
    navLabel: "Invisalign",
    eyebrow: "Clear aligners",
    description:
      "Discreet, removable Invisalign clear aligners planned around your teeth, bite, and daily routine at our Antelope office.",
    intro:
      "Invisalign straightens teeth using a custom series of clear, removable trays—no metal brackets, and easy to slip out for meals and brushing. At your evaluation in Antelope, we check your teeth, gums, and bite so you know right away whether aligners fit your goals and what the commitment looks like.",
    benefits: [
      "Low-profile, clear trays that blend into everyday life",
      "Removable for meals, brushing, and normal flossing",
      "Planned around both smile aesthetics and healthy bite function",
      "Regular progress checks with a team you already know",
    ],
    steps: [
      {
        title: "Confirm candidacy",
        body: "We examine your teeth, gums, and bite to verify that clear aligners can safely and predictably move your teeth.",
      },
      {
        title: "Preview the plan",
        body: "Before you commit, we review expected tooth movement, daily wear habits, check-in timing, and a written cost estimate.",
      },
      {
        title: "Stay on track together",
        body: "You advance through aligner sets as directed and stop in for quick checks so we can confirm everything tracks smoothly.",
      },
    ],
    faqs: [
      {
        question: "How long does Invisalign treatment take?",
        answer:
          "Timeline depends on how much movement your teeth need, how your bite fits, and how consistently you wear your trays each day. After examining your bite, we'll give you a realistic estimate for your specific case.",
      },
      {
        question: "How much does Invisalign cost?",
        answer:
          "Cost depends on your treatment plan and your dental benefits. After your alignment and bite evaluation, we provide a written estimate and help you check any orthodontic benefits with your insurer.",
      },
      {
        question: "Can I take Invisalign aligners out to eat and brush?",
        answer:
          "Yes—you take them out for meals, hot or staining drinks, brushing, and flossing. For teeth to stay on schedule, they just need to go right back in and be worn consistently as directed.",
      },
      {
        question: "How do I know if I am a good candidate for Invisalign?",
        answer:
          "A quick dental and bite exam gives you a real answer. We check gum health, existing dental work, crowding, and bite mechanics before recommending clear aligners.",
      },
    ],
    sources: [{ label: "ADA: Braces and aligners", url: "https://www.mouthhealthy.org/all-topics-a-z/braces" }],
    relatedSlugs: ["orthodontics", "dental-crowns"],
  },
  {
    slug: "tooth-extractions",
    title: "Tooth Extractions in Antelope & Sacramento, CA",
    searchTitle: "Tooth Extraction Antelope & Sacramento | Oral Surgery",
    searchDescription:
      "Painful, cracked, or infected tooth? Get an honest extraction exam in Antelope, serving Sacramento. Learn if it can be saved: (916) 727-6453.",
    navLabel: "Tooth extractions",
    eyebrow: "Oral surgery",
    description:
      "Calm, gentle tooth extraction evaluations and in-house removals in Antelope—always checking first whether your tooth can be saved.",
    intro:
      "Our first instinct is always to save a natural tooth when we can. When deep decay, a severe fracture, or infection makes saving a tooth unrealistic, removing it cleanly protects the rest of your mouth. We'll show you what's going on, keep you thoroughly numb, and talk through replacement choices before you decide.",
    benefits: [
      "Honest assessment of whether the tooth can still be saved",
      "Thorough local numbing with The Wand STA and a calm pace",
      "In-house extraction with specialist coordination for complex cases",
      "Clear recovery guidance and replacement planning when needed",
    ],
    steps: [
      {
        title: "Diagnose the source of trouble",
        body: "We examine the tooth and take digital X-rays or 3D imaging to see the roots, surrounding bone, and nearby nerves.",
      },
      {
        title: "Weigh saving versus removing",
        body: "We explain honestly whether a crown or root canal makes sense, or whether removal is the healthier, more predictable option.",
      },
      {
        title: "Plan comfort and next steps",
        body: "If removal is needed, we review numbing, recovery care, whether PRF or grafting helps, and any replacement options.",
      },
    ],
    faqs: [
      {
        question: "Does a painful tooth always have to be pulled?",
        answer:
          "Not at all. Toothaches come from many causes—some need only a filling, a crown, or root canal therapy to save the tooth. An exam and X-ray show what's truly possible.",
      },
      {
        question: "What should I do if I have severe tooth pain right now?",
        answer:
          "Call us right away at (916) 727-6453. Our team can advise you on immediate steps and check for the earliest available visit.",
      },
      {
        question: "How long does recovery take after a tooth extraction?",
        answer:
          "Healing depends on which tooth was removed and how complex the root structure was. Before your visit, we walk through swelling, soft foods, home care, and whether PRF & grafting could help support the site.",
        links: [{ href: "/platelet-rich-fibrin", label: "PRF & grafting" }],
      },
      {
        question: "Can I replace a missing tooth after an extraction?",
        answer:
          "Yes. Depending on your bite and bone health, we can plan ahead for dental implants or dentures and bridges so you know your full timeline before the tooth is removed.",
        links: [
          { href: "/dental-implants", label: "dental implants" },
          { href: "/dentures", label: "dentures" },
        ],
      },
    ],
    relatedSlugs: ["dental-emergencies", "sedation-dentistry", "wisdom-teeth", "dental-implants", "platelet-rich-fibrin"],
  },
  {
    slug: "dental-implants",
    title: "Dental Implants in Sacramento & Antelope, CA",
    searchTitle: "Dental Implants Sacramento & Antelope | 3D-Guided Care",
    navLabel: "Dental implants",
    eyebrow: "Tooth replacement",
    description:
      "Replace missing teeth from the root up with 3D-planned dental implants in Antelope, serving Greater Sacramento. Call (916) 727-6453 to book.",
    intro:
      "A dental implant replaces a missing tooth from the root up, anchoring a custom crown or restoration so it feels steady when you bite, chew, and laugh. Using CBCT 3D imaging right in our Antelope office, we check your bone and gum health first and map out every stage before treatment begins.",
    benefits: [
      "Replace a missing tooth from the root up for lasting stability",
      "Planned with CBCT 3D imaging for accurate placement",
      "Protects neighboring healthy teeth without grinding them down",
      "Custom-matched crown designed to look and feel natural",
    ],
    steps: [
      {
        title: "Scan and evaluate the site",
        body: "We examine your gums and remaining teeth and use CBCT 3D imaging to measure bone volume and map nearby anatomy.",
      },
      {
        title: "Lay out the exact sequence",
        body: "We walk through every step—placement, healing time, any bone support needed, and a written estimate—before anything starts.",
      },
      {
        title: "Complete your new tooth",
        body: "Once the implant has healed solidly in the bone, we place your custom restoration and fine-tune your bite.",
      },
    ],
    faqs: [
      {
        question: "Is getting a dental implant finished in a single visit?",
        answer:
          "No—implant care happens in stages: 3D planning, placement, healing time so the implant integrates with bone, and then your final custom crown. Any bone grafting also affects timing, so a finished tooth in one visit is not guaranteed. We outline your exact sequence upfront.",
      },
      {
        question: "What are the alternatives to a dental implant?",
        answer:
          "Depending on where the gap is and the health of surrounding teeth, a dental bridge or a removable partial or full denture may also be good options. We compare all of them honestly at your exam.",
      },
      {
        question: "Am I a candidate for a dental implant?",
        answer:
          "Candidacy depends on gum health, available bone, overall medical history, and the tooth's position. A 3D-imaging exam gives you a dependable answer.",
      },
      {
        question: "Can an implant replace just one missing tooth?",
        answer:
          "Yes. Implants work well for a single missing tooth, and implant-supported restorations can also replace multiple teeth depending on your bite and bone.",
      },
      {
        question: "What if I need bone support for an implant?",
        answer:
          "During your exam and 3D scan, we check whether the bone is thick and tall enough to anchor an implant. If extra support would help the site, we discuss bone grafting or PRF & grafting step by step.",
        links: [{ href: "/platelet-rich-fibrin", label: "PRF & grafting" }],
      },
      {
        question: "Can I be sedated for dental implant treatment?",
        answer:
          "Let us know upfront if you feel anxious about surgery. Because safety depends on your health history and planned procedure, we review both before confirming whether sedation is appropriate and which options are available here. Read more about sedation dentistry options.",
        links: [{ href: "/sedation-dentistry", label: "sedation dentistry" }],
      },
    ],
    sources: [{ label: "ADA: Implants", url: "https://www.mouthhealthy.org/all-topics-a-z/implants" }],
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
      "Comfortable full and partial dentures in Antelope, with implant and bridge alternatives compared honestly at your exam. Call (916) 727-6453.",
    navLabel: "Dentures",
    eyebrow: "Restorative dentistry",
    description:
      "Well-fitted full and partial dentures in Antelope, with implant and bridge alternatives explained side by side at your exam.",
    intro:
      "Dentures restore your ability to eat, speak, and smile comfortably with a removable appliance—a full denture when an entire arch of teeth is missing, or a partial denture when healthy natural teeth remain. We take time to dial in the fit and compare dentures alongside implants or bridges so you can choose with confidence.",
    benefits: [
      "Full dentures crafted for a natural look and balanced bite",
      "Partial dentures designed to work cleanly with remaining teeth",
      "Honest comparison with dental implants and bridges",
      "Follow-up fit checks and adjustments as your gums adapt",
    ],
    steps: [
      {
        title: "Evaluate gums, teeth, and bone",
        body: "We examine your mouth and review imaging to assess gum health, remaining teeth, and jaw support.",
      },
      {
        title: "Compare every replacement choice",
        body: "We walk through full dentures, partial dentures, bridges, and implants—including daily wear, timeline, and written estimates.",
      },
      {
        title: "Fit and fine-tune",
        body: "After fitting your new denture, we schedule follow-up checks to ease any sore spots as you get comfortable eating and speaking.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between full and partial dentures?",
        answer:
          "A full denture replaces every tooth in the upper or lower arch. A partial denture fills specific gaps and rests securely around the healthy natural teeth you still have.",
      },
      {
        question: "Can dental implants help keep a denture from slipping?",
        answer:
          "In many cases, yes. Whether dental implants can stabilize a denture depends on your bone volume, health history, and goals—our exam and 3D imaging show what's realistic for you.",
        links: [{ href: "/dental-implants", label: "dental implants" }],
      },
      {
        question: "How long does it take to get used to new dentures?",
        answer:
          "Expect an adjustment period as your cheeks, tongue, and gums learn the new fit—mild sore spots are common early on. Follow-up adjustment visits make a big difference in everyday comfort.",
      },
      {
        question: "Do I still need dental checkups if I wear full dentures?",
        answer:
          "Yes. Regular exams let us check denture fit as your jaw naturally changes shape over time, keep gum tissue healthy, and perform routine oral cancer screenings.",
        links: [{ href: "/preventive-care", label: "Regular exams" }],
      },
      {
        question: "How much do dentures cost?",
        answer:
          "Cost depends on whether you need a full or partial denture, any extractions or prep work required first, and your dental benefits. We provide a written estimate after your exam.",
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
    title: "Gum Disease Treatment & Deep Cleaning in Antelope & Sacramento",
    bookingLabel: "Book a gum evaluation",
    searchTitle: "Gum Disease & Deep Cleaning | Sacramento & Antelope",
    searchDescription:
      "Bleeding, tender, or receding gums? Get a gum exam and deep cleaning (scaling & root planing) in Antelope, serving Sacramento: (916) 727-6453.",
    navLabel: "Gum disease treatment",
    eyebrow: "Periodontal care",
    description:
      "Thorough gum health evaluations, gentle deep cleanings (scaling and root planing), and ongoing periodontal care in Antelope.",
    intro:
      "Gums that bleed when you brush, feel tender, or look like they're pulling back are easy to shrug off—until bone support around your teeth starts to shrink. At our Antelope office, we measure the pockets around each tooth, show you the numbers, and explain whether a deep cleaning (scaling and root planing) can help calm inflammation and protect your teeth.",
    benefits: [
      "Accurate pocket measurements to track gum health over time",
      "Deep cleaning below the gumline to clear stubborn tartar and bacteria",
      "Soft tissue laser support when clinically helpful",
      "Realistic home-care habits and maintenance intervals that actually stick",
    ],
    steps: [
      {
        title: "Measure gum health",
        body: "We gently measure pocket depths around each tooth, check for bleeding or recession, and review X-rays to see supporting bone.",
      },
      {
        title: "Review numbers and options",
        body: "We show you exactly which areas need care, give you a written estimate, and tell you honestly if seeing a gum specialist makes sense.",
      },
      {
        title: "Calm gums and keep them healthy",
        body: "After targeted cleaning below the gumline, we pair practical home steps with tailored follow-up visits to protect your results.",
      },
    ],
    faqs: [
      {
        question: "How is a deep cleaning different from a routine cleaning?",
        answer:
          "A routine cleaning polishes above the gumline to maintain healthy gums. Deep cleaning (scaling and root planing) carefully removes hardened buildup and bacteria from below the gumline when pocket measurements show active gum disease.",
      },
      {
        question: "Can I have gum disease even if nothing hurts?",
        answer:
          "Yes—early and even moderate gum disease rarely hurts. Bleeding when brushing or flossing, receding gums, persistent bad breath, or teeth feeling slightly loose are common clues, and a gum exam gives you the full picture.",
      },
      {
        question: "Are bleeding gums ever normal?",
        answer:
          "Brief irritation from a hard toothbrush can happen once in a while, but gums that bleed regularly are signaling inflammation or gum disease and are worth getting checked early.",
      },
      {
        question: "Can untreated gum disease cause tooth loss?",
        answer:
          "Yes. Left unchecked, advanced periodontal disease erodes the gum tissue and bone holding teeth in place. Catching and treating it earlier gives us far more ways to keep your natural teeth stable.",
      },
      {
        question: "Does a deep dental cleaning hurt?",
        answer:
          "We focus on keeping your gums thoroughly comfortable during scaling and root planing, including gentle local numbing with The Wand STA when needed. Tell us if you feel anxious so we can discuss sedation dentistry and comfort choices beforehand.",
        links: [{ href: "/sedation-dentistry", label: "sedation dentistry" }],
      },
    ],
    sources: [
      { label: "ADA: Gum disease", url: "https://www.mouthhealthy.org/all-topics-a-z/gum-disease" },
      { label: "ADA: Scaling and root planing", url: "https://www.mouthhealthy.org/all-topics-a-z/scaling-and-root-planing" },
    ],
    relatedSlugs: ["preventive-care", "dental-crowns"],
  },
  {
    slug: "dental-emergencies",
    title: "Emergency Dentist in Antelope & Sacramento, CA",
    searchTitle: "Emergency Dentist Antelope & Sacramento | Open Until 7 PM",
    searchDescription:
      "Toothache, swelling, or broken tooth? Call (916) 727-6453 for urgent care in Antelope, serving Sacramento. Open until 7 PM Wed & Thu.",
    navLabel: "Dental emergencies",
    eyebrow: "Urgent dental care",
    description:
      "Call (916) 727-6453 first for sudden tooth pain, swelling, a broken tooth, or a lost crown or filling at our Elverta Rd office in Antelope.",
    intro:
      "Severe toothache, facial swelling, a knocked-out or broken tooth, or a crown that just popped off? Call our Elverta Road office before heading over. We treat urgent cases Monday through Friday—including until 7 PM on Wednesdays and Thursdays—and fit in same-day emergency visits whenever space allows.",
    benefits: [
      "Immediate phone guidance for severe pain, swelling, or injury",
      "Prompt exams for broken, chipped, or knocked-out teeth",
      "Help re-securing or repairing lost fillings and crowns",
      "Same-day weekday openings whenever schedule space permits",
    ],
    steps: [
      {
        title: "Call us first",
        body: "Tell our front desk what happened and where it hurts so we can advise you right away and check for the soonest opening.",
      },
      {
        title: "Find the cause and relieve pain",
        body: "We focus first on diagnosing the source with an exam and X-ray, stabilizing the tooth, and getting you out of acute trouble.",
      },
      {
        title: "Plan the lasting fix",
        body: "Once things are calm and diagnosed, we explain your long-term repair choices and written estimate before you decide.",
      },
    ],
    faqs: [
      {
        question: "Should I book online or call for a dental emergency?",
        answer:
          "Call (916) 727-6453 first whenever you have severe pain, swelling, or a tooth injury. Speaking with our desk is always the fastest way to get immediate advice and the earliest opening.",
      },
      {
        question: "Are you open evenings or weekends for dental emergencies?",
        answer:
          "We are open until 7 PM on Wednesdays and Thursdays, and closed on Saturdays and Sundays. We are not a 24-hour emergency clinic, so please call during weekday hours to confirm our earliest availability.",
      },
      {
        question: "What counts as a dental emergency versus a 911 medical emergency?",
        answer:
          "Call us at (916) 727-6453 for intense toothaches, broken teeth, lost restorations, or localized swelling. If you have trouble breathing or swallowing, uncontrolled bleeding, or a serious facial or head injury, call 911 or go to the nearest ER right away.",
      },
      {
        question: "Can you see dental emergencies the same day?",
        answer:
          "We offer same-day emergency visits when possible. Calling (916) 727-6453 first lets our team look at today's schedule and work to get you in as quickly as we can.",
      },
      {
        question: "What should I do if I crack a tooth or lose a crown?",
        answer:
          "Rinse gently with warm water, keep any intact crown or tooth fragment in a clean container, avoid chewing on that side, and call (916) 727-6453 right away. At your exam, we'll check whether re-cementing or dental crowns can protect the tooth.",
        links: [{ href: "/dental-crowns", label: "dental crowns" }],
      },
    ],
    sources: [{ label: "ADA: Dental emergencies", url: "https://www.mouthhealthy.org/all-topics-a-z/dental-emergencies" }],
    relatedSlugs: ["tooth-extractions", "root-canal-therapy", "wisdom-teeth"],
  },
  {
    slug: "root-canal-therapy",
    title: "Root Canal Treatment & Endodontist in Antelope & Sacramento",
    searchTitle: "Root Canal Specialist & Endodontist | Antelope & Sacramento",
    searchDescription:
      "Deep tooth pain? In-house endodontic specialist Dr. Lucas Sheppard treats complex root canals in Antelope, serving Sacramento: (916) 727-6453.",
    navLabel: "Root canal treatment",
    eyebrow: "Endodontic care",
    description:
      "In-house root canal therapy in Antelope with endodontic specialist Dr. Lucas L. Sheppard, DMD—focused on calm care and saving natural teeth.",
    intro:
      "Root canal treatment clears out infected or inflamed tissue inside a tooth, cleans and seals the root canals, and lets you keep a natural tooth that would otherwise need to be pulled. Because endodontic specialist Dr. Lucas L. Sheppard practices right here in our Antelope office, even complex cases stay under one familiar roof.",
    benefits: [
      "In-house care from endodontic specialist Dr. Lucas L. Sheppard",
      "Pinpoint diagnosis to find the real source of deep tooth pain",
      "Focused on saving your natural tooth whenever predictable",
      "Seamless coordination of your final protective filling or crown",
    ],
    steps: [
      {
        title: "Pinpoint the problem",
        body: "We test the tooth and review digital X-rays or 3D imaging so we know for certain which tooth is hurting and whether it can be saved.",
      },
      {
        title: "Clean and seal the canals gently",
        body: "Once the area is thoroughly numb, we remove the inflamed tissue inside the tooth, disinfect the canals, and seal them carefully.",
      },
      {
        title: "Protect the tooth for the long run",
        body: "After treatment, we coordinate the final filling or crown that seals out bacteria and restores full chewing strength.",
      },
    ],
    nearbyLinks: [{ href: "/meet-dr-sheppard", label: "Meet Dr. Sheppard" }],
    faqs: [
      {
        question: "Does a toothache always mean I need a root canal?",
        answer:
          "No. Sensitivity or pain can come from a cavity, a loose filling, gum irritation, clenching, or a crack. An exam and imaging show whether a simple filling, root canal therapy, or another fix is actually needed.",
      },
      {
        question: "Who performs specialist root canal care at your office?",
        answer:
          "Dr. Lucas L. Sheppard, DMD—an endodontic specialist and U.S. Air Force veteran—is part of our team here in Antelope. Call (916) 727-6453 to ask about an evaluation and his upcoming schedule.",
      },
      {
        question: "Will I need a crown after a root canal?",
        answer:
          "Every treated tooth needs a durable final restoration to keep bacteria out and prevent fractures. Depending on which tooth was treated and how much healthy structure remains, we'll recommend either a crown or a filling.",
      },
      {
        question: "What should I do if my tooth is throbbing right now?",
        answer:
          "Call (916) 727-6453 so we can check our earliest availability. We fit in same-day visits when possible—don't wait on an online inquiry if pain or swelling is escalating.",
      },
      {
        question: "Does a root canal hurt?",
        answer:
          "Modern root canal treatment is designed to relieve deep tooth pain, not cause it. We verify that the tooth is thoroughly numb before starting, use gentle local delivery, and can review sedation dentistry options if you feel anxious.",
        links: [{ href: "/sedation-dentistry", label: "sedation dentistry" }],
      },
    ],
    relatedSlugs: ["dental-crowns", "dental-emergencies", "tooth-extractions"],
    sources: [
      {
        label: "ADA: Root canals",
        url: "https://www.mouthhealthy.org/all-topics-a-z/root-canals",
      },
    ],
  },
  {
    slug: "wisdom-teeth",
    title: "Wisdom Teeth Removal in Antelope & Sacramento, CA",
    navLabel: "Wisdom teeth",
    eyebrow: "Oral surgery",
    description:
      "In-house wisdom teeth exams and gentle removal on Elverta Rd in Antelope, serving Greater Sacramento. Call (916) 727-6453 or request a visit.",
    intro:
      "Wisdom teeth can sit quietly for years—or suddenly start aching, crowding, trapping food, or swelling the gum behind your back molars. We evaluate wisdom teeth right here in Antelope with digital or 3D imaging and handle removal in-house when taking them out is the healthier path, coordinating with a specialist whenever a complex case calls for it.",
    benefits: [
      "Clear exam of aching, crowded, or partially erupted wisdom teeth",
      "Honest advice on whether to watch them or remove them now",
      "Gentle in-house removal, with specialist coordination when needed",
      "Thorough numbing, comfort planning, and clear recovery guidance",
    ],
    steps: [
      {
        title: "See where the roots sit",
        body: "We examine your back teeth and use digital or 3D imaging to check tooth angles, root positions, and nearby nerves.",
      },
      {
        title: "Decide whether removal makes sense",
        body: "We'll tell you honestly whether watchful waiting or removal is safer—and whether your case is best handled here or with a specialist.",
      },
      {
        title: "Walk through visit and recovery",
        body: "If removal is recommended, we cover numbing, comfort options, and how to care for the area afterward before treatment day.",
      },
    ],
    faqs: [
      {
        question: "Do all wisdom teeth have to come out?",
        answer:
          "No. If your wisdom teeth come in straight, have plenty of room, and stay easy to clean, watching them is often fine. We only recommend removal when imaging and your exam show crowding, impaction, decay, or recurring gum inflammation.",
      },
      {
        question: "Can you remove wisdom teeth right at your Antelope office?",
        answer:
          "Yes—we perform wisdom teeth evaluations and removals in-house on Elverta Road. For unusually complex impactions, we coordinate directly with a trusted specialist when that's the safer choice.",
      },
      {
        question: "What should I do if a wisdom tooth hurts now?",
        answer:
          "Call (916) 727-6453 to tell us about the pain or swelling so we can check for the soonest evaluation. We see urgent cases the same day when space allows—visit our Dental emergencies page for immediate hours and guidance.",
        links: [{ href: "/dental-emergencies", label: "Dental emergencies" }],
      },
      {
        question: "Will I be numb for wisdom teeth removal?",
        answer:
          "Yes—thorough local numbing is always part of extraction care, and we use The Wand STA for gentler delivery. Tell us if you're nervous so we can review your health history and discuss which sedation dentistry options are available and appropriate.",
        links: [{ href: "/sedation-dentistry", label: "sedation dentistry" }],
      },
      {
        question: "What is recovery like after wisdom teeth removal?",
        answer:
          "Recovery varies with how many teeth are removed and how deeply they sit. Before treatment day, we walk you through swelling and eating expectations, comfort planning, and how to care for the area afterward.",
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
    title: "PRF & Bone Grafting in Antelope & Sacramento, CA",
    searchTitle: "PRF & Bone Grafting | Antelope & Sacramento Oral Surgery",
    searchDescription:
      "Platelet-rich fibrin (PRF) and bone grafting to support tooth extraction or dental implant sites in Antelope, serving Sacramento: (916) 727-6453.",
    navLabel: "PRF & grafting",
    eyebrow: "Oral surgery",
    description:
      "Platelet-rich fibrin (PRF) and bone grafting options to support healing sites after extractions or ahead of dental implants in Antelope.",
    intro:
      "When we remove a tooth or prepare a site for a future dental implant, protecting the underlying bone matters. We offer platelet-rich fibrin (PRF)—prepared right from a small sample of your own blood—alongside bone grafting when extra structural or biological support fits your case. Your exam shows whether PRF, grafting, both, or neither makes sense.",
    benefits: [
      "Prepared naturally from a small sample of your own blood",
      "Helps support extraction sockets and implant-planning sites",
      "Evaluated honestly case by case—never added unnecessarily",
      "Simple day-of explanation and step-by-step recovery care",
    ],
    steps: [
      {
        title: "Assess bone and surrounding tissue",
        body: "We examine the tooth or missing-tooth site and use imaging to measure bone thickness and map nearby structures.",
      },
      {
        title: "Explain whether support helps",
        body: "We'll tell you why PRF, bone grafting, both, or neither makes sense for your goals—especially if you're planning an implant.",
      },
      {
        title: "Know what to expect on visit day",
        body: "If you choose PRF, we walk through the quick blood draw, placement, written estimate, and simple home care afterward.",
      },
    ],
    faqs: [
      {
        question: "What is platelet-rich fibrin (PRF)?",
        answer:
          "PRF is a natural fibrin matrix spun from a small sample of your own blood right before placement. We may place it in an extraction or grafting site to support the local healing environment when clinically appropriate.",
      },
      {
        question: "Do you offer bone grafting after extractions or for implants?",
        answer:
          "Yes—we evaluate grafting needs case by case, most often right after a tooth extraction or when preparing bone for a dental implant. We'll explain whether grafting, PRF, both, or neither is worthwhile for your site.",
      },
      {
        question: "Does PRF guarantee faster healing?",
        answer:
          "No. While PRF is used to support a surgical site naturally, every person heals at their own pace and no specific recovery timeline or outcome can be guaranteed. We'll share realistic expectations for your procedure.",
      },
      {
        question: "Does every tooth extraction need PRF or bone grafting?",
        answer:
          "Not at all. Plenty of routine extractions heal well on their own. We only suggest PRF or grafting when your bone, site anatomy, or future tooth-replacement plan would genuinely benefit.",
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
