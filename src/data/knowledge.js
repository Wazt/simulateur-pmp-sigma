// PMP Knowledge Base for the Assistant feature
// Compiled from PMBOK 7 + Agile Practice Guide + PMI standards
window.PMP_KNOWLEDGE = [
  // ===== PMBOK 7 PRINCIPLES =====
  { id: 'principle-stewardship', topic: 'Principe : Gérance (Stewardship)', tags: ['principe','éthique','gouvernance','responsabilité'], domain: 'Business',
    summary: "Être un gérant diligent, respectueux et soucieux. Inclut l'intégrité, l'attention, la fiabilité et la conformité." },
  { id: 'principle-team', topic: 'Principe : Équipe (Team)', tags: ['équipe','leadership','collaboration','servant-leader'], domain: 'People',
    summary: "Créer un environnement collaboratif d'équipe projet. Cultiver la diversité, la sécurité psychologique, la responsabilité partagée et l'efficacité collective." },
  { id: 'principle-stakeholders', topic: 'Principe : Parties prenantes', tags: ['parties prenantes','engagement','communication'], domain: 'People',
    summary: "Engager efficacement les parties prenantes. Comprendre, analyser, communiquer activement pour livrer de la valeur et atténuer les conflits." },
  { id: 'principle-value', topic: 'Principe : Valeur', tags: ['valeur','bénéfices','roi','business case'], domain: 'Business',
    summary: "Se concentrer sur la valeur. Évaluer et ajuster continuellement les bénéfices attendus par rapport aux objectifs et à la stratégie de l'organisation." },
  { id: 'principle-systems', topic: 'Principe : Pensée systémique', tags: ['systèmes','interactions','dépendances'], domain: 'Process',
    summary: "Reconnaître, évaluer et répondre aux interactions du système. Considérer le projet comme un système avec interdépendances internes et externes." },
  { id: 'principle-leadership', topic: 'Principe : Leadership', tags: ['leadership','motivation','vision','servant-leader'], domain: 'People',
    summary: "Démontrer du leadership comportemental : vision, motivation, intelligence émotionnelle, communication, prise de décision basée sur les faits." },
  { id: 'principle-tailoring', topic: 'Principe : Adapter (Tailoring)', tags: ['adapter','méthodologie','contexte','hybride'], domain: 'Process',
    summary: "Adapter l'approche selon le contexte unique du projet (taille, complexité, culture, secteur). Mélanger prédictif et agile au besoin." },
  { id: 'principle-quality', topic: 'Principe : Qualité', tags: ['qualité','exigences','conformité','dod'], domain: 'Process',
    summary: "Intégrer la qualité dans les processus et les livrables. La qualité est conformité aux exigences et adéquation à l'usage." },
  { id: 'principle-complexity', topic: 'Principe : Complexité', tags: ['complexité','incertitude','système'], domain: 'Process',
    summary: "Naviguer dans la complexité via la transparence, l'expérimentation et l'apprentissage continu. Décomposer les systèmes complexes." },
  { id: 'principle-risk', topic: 'Principe : Risque', tags: ['risque','opportunité','menace','registre'], domain: 'Process',
    summary: "Optimiser les réponses aux risques. Risques = menaces + opportunités. Identification continue, évaluation, planification, surveillance." },
  { id: 'principle-adaptability', topic: 'Principe : Adaptabilité et résilience', tags: ['adaptabilité','résilience','agilité','changement'], domain: 'Process',
    summary: "Embarquer l'adaptabilité et la résilience. Anticiper les changements, ajuster les plans rapidement, apprendre des échecs." },
  { id: 'principle-change', topic: 'Principe : Changement', tags: ['changement','transformation','adoption'], domain: 'Business',
    summary: "Permettre le changement pour réaliser l'état futur envisagé. Engagement, communication, formation, gestion du changement organisationnel." },

  // ===== PERFORMANCE DOMAINS (PMBOK 7) =====
  { id: 'domain-stakeholders', topic: 'Domaine de performance : Parties prenantes', tags: ['parties prenantes','engagement','registre','matrice'], domain: 'People',
    summary: "Identifier, analyser (pouvoir/intérêt, influence/impact), planifier l'engagement, surveiller. Outputs : registre des parties prenantes, plan d'engagement." },
  { id: 'domain-team', topic: 'Domaine : Équipe', tags: ['équipe','leadership','culture','tuckman','conflits'], domain: 'People',
    summary: "Construire et coacher l'équipe. Modèle de Tuckman (Forming/Storming/Norming/Performing). Résolution de conflits (Thomas-Kilmann). Intelligence émotionnelle." },
  { id: 'domain-approach', topic: 'Domaine : Approche de développement et cycle de vie', tags: ['cycle de vie','prédictif','agile','hybride','itératif','incrémental'], domain: 'Process',
    summary: "Choisir l'approche : prédictif (waterfall), itératif, incrémental, agile, hybride. Selon stabilité des exigences, complexité, fréquence de livraison." },
  { id: 'domain-planning', topic: 'Domaine : Planification', tags: ['planification','wbs','baseline','estimation'], domain: 'Process',
    summary: "Planifier de manière progressive et adaptative. WBS, estimations (analogie, paramétrique, 3 points, bottom-up), baselines coût/délai/périmètre." },
  { id: 'domain-projectwork', topic: 'Domaine : Travail du projet', tags: ['exécution','processus','communication','procurement'], domain: 'Process',
    summary: "Exécuter efficacement : communication, gestion physique des ressources, marchés, gestion des connaissances." },
  { id: 'domain-delivery', topic: 'Domaine : Livraison', tags: ['livraison','qualité','périmètre','validation','dod'], domain: 'Process',
    summary: "Livrer le périmètre et la qualité prévue. Critères d'acceptation, Definition of Done, validation par le client." },
  { id: 'domain-measurement', topic: 'Domaine : Mesure', tags: ['evm','cpi','spi','kpi','métriques'], domain: 'Process',
    summary: "Évaluer la performance et prendre des actions appropriées. EVM (PV, EV, AC, CPI, SPI), métriques agiles (vélocité, burn-down, lead time, cycle time)." },
  { id: 'domain-uncertainty', topic: 'Domaine : Incertitude', tags: ['risque','incertitude','ambigüité','volatilité'], domain: 'Process',
    summary: "Gérer l'incertitude : risques (registre, EMV, monte-carlo), ambigüité, volatilité, complexité (matrice Stacey, Cynefin)." },

  // ===== AGILE PRACTICE GUIDE =====
  { id: 'agile-scrum', topic: 'Scrum (cadre agile)', tags: ['scrum','sprint','rôles','événements','artefacts'], domain: 'Process',
    summary: "Rôles : Product Owner, Scrum Master, Equipe de Dev. Événements : Sprint Planning, Daily Standup, Sprint Review, Rétrospective. Artefacts : Product Backlog, Sprint Backlog, Increment. Sprints de 1-4 semaines." },
  { id: 'agile-kanban', topic: 'Kanban', tags: ['kanban','wip','flux','pull'], domain: 'Process',
    summary: "Visualiser le flux de travail. Limiter le WIP (Work In Progress). Pull system. Mesures : lead time, cycle time, throughput. Pas de sprints, flux continu." },
  { id: 'agile-xp', topic: 'eXtreme Programming (XP)', tags: ['xp','tdd','pair-programming','refactoring'], domain: 'Process',
    summary: "Pratiques techniques : pair-programming, TDD (Test-Driven Development), CI/CD, refactoring continu, simple design, métaphore système." },
  { id: 'agile-lean', topic: 'Lean (principes)', tags: ['lean','gaspillage','valeur','kaizen'], domain: 'Process',
    summary: "Éliminer le gaspillage (7+1 mudas). Maximiser la valeur. Amélioration continue (kaizen). Respect des personnes. Décider au plus tard." },
  { id: 'agile-sm-role', topic: 'Rôle du Scrum Master', tags: ['scrum master','servant leader','coaching','impediment'], domain: 'People',
    summary: "Servant-leader : coache l'équipe, le PO et l'organisation. Lève les impediments. Facilite les événements Scrum. Protège l'équipe. N'est pas un chef hiérarchique." },
  { id: 'agile-po-role', topic: 'Rôle du Product Owner', tags: ['product owner','backlog','priorisation','valeur'], domain: 'Process',
    summary: "Maximiser la valeur. Possède le Product Backlog. Priorise (MoSCoW, WSJF, Kano). Définit critères d'acceptation. Disponible pour l'équipe." },
  { id: 'agile-metrics', topic: 'Métriques agiles', tags: ['vélocité','burn-down','burn-up','lead time','cycle time','cumulative flow'],  domain: 'Process',
    summary: "Vélocité (story points/sprint), burn-down (travail restant), burn-up (travail réalisé vs scope), lead time, cycle time, cumulative flow diagram." },
  { id: 'agile-estimation', topic: 'Estimation agile', tags: ['planning poker','story points','fibonacci','t-shirt'], domain: 'Process',
    summary: "Planning Poker, T-shirt sizing, Story Points (suite Fibonacci). Estimation relative, pas en heures. Affinage du backlog (refinement)." },
  { id: 'agile-userstory', topic: 'User Story', tags: ['user story','invest','format','acceptance'], domain: 'Process',
    summary: "Format Connextra : En tant que [rôle], je veux [fonctionnalité], afin de [bénéfice]. Critères INVEST : Independent, Negotiable, Valuable, Estimable, Small, Testable." },
  { id: 'agile-dod', topic: 'Definition of Done (DoD) vs Definition of Ready (DoR)', tags: ['dod','dor','qualité','acceptation'], domain: 'Process',
    summary: "DoD : critères de complétude partagés pour chaque incrément (code, tests, doc, déployable). DoR : critères pour qu'une story entre dans un sprint (claire, estimée, testable)." },

  // ===== CONFLICT MANAGEMENT =====
  { id: 'conflict-thomas-kilmann', topic: 'Modes de résolution de conflit (Thomas-Kilmann)', tags: ['conflit','résolution','collaborating','compromising'], domain: 'People',
    summary: "5 modes : Collaborating (gagnant-gagnant, problem-solving, recommandé), Compromising (perdant-perdant léger), Forcing (gagnant-perdant), Avoiding (lose-lose), Accommodating (smooth)." },

  // ===== LEADERSHIP MODELS =====
  { id: 'leadership-styles', topic: 'Styles de leadership', tags: ['leadership','transformationnel','servant','situationnel'], domain: 'People',
    summary: "Transformationnel : inspire et transforme. Servant-leader : sert l'équipe avant tout. Situationnel : adapte selon maturité. Transactionnel : récompense/punition. Charismatique." },
  { id: 'tuckman-model', topic: 'Modèle de Tuckman (cycle équipe)', tags: ['tuckman','forming','storming','norming','performing','adjourning'], domain: 'People',
    summary: "Forming (formation), Storming (tension), Norming (normes), Performing (haute performance), Adjourning (dissolution). Le PM coache à chaque phase." },
  { id: 'motivation-theories', topic: 'Théories de motivation', tags: ['maslow','herzberg','mcgregor','pink','intrinsèque'], domain: 'People',
    summary: "Maslow (pyramide besoins), Herzberg (facteurs hygiène vs motivateurs), McGregor (théorie X/Y), Daniel Pink (autonomie/maîtrise/sens), Vroom (expectancy)." },

  // ===== COMMUNICATION =====
  { id: 'communication-channels', topic: 'Canaux de communication', tags: ['communication','channels','formule'], domain: 'People',
    summary: "Nombre de canaux = n(n-1)/2 où n = nb participants. Important pour évaluer la complexité de la communication d'un projet." },
  { id: 'communication-plan', topic: 'Plan de communication', tags: ['plan','communication','parties prenantes','fréquence'], domain: 'People',
    summary: "Définit quoi, à qui, quand, comment, par qui pour chaque besoin d'information. Adapté à chaque partie prenante. Maintenu à jour tout au long du projet." },

  // ===== CHANGE CONTROL =====
  { id: 'change-control', topic: 'Maîtrise intégrée des changements (CCB)', tags: ['change request','ccb','baseline','impact'], domain: 'Process',
    summary: "Toute modification de baseline passe par : demande formelle → analyse d'impact (coût/délai/qualité/risque) → décision CCB → mise à jour des baselines et plans → communication." },

  // ===== RISK MANAGEMENT =====
  { id: 'risk-strategies-threats', topic: 'Stratégies de réponse aux menaces', tags: ['risque','menace','éviter','transférer','atténuer','accepter','escalader'], domain: 'Process',
    summary: "Éviter (supprimer la cause), Transférer (assurance, contrat), Atténuer (réduire prob/impact), Accepter (passif ou actif avec réserve), Escalader (hors autorité du PM)." },
  { id: 'risk-strategies-opportunities', topic: 'Stratégies pour opportunités', tags: ['risque','opportunité','exploiter','partager','améliorer','accepter'], domain: 'Process',
    summary: "Exploiter (probabilité 100%), Améliorer (augmenter prob/impact), Partager (avec partenaire), Accepter, Escalader." },
  { id: 'risk-reserves', topic: 'Réserves : aléas vs management', tags: ['contingence','réserve','baseline','unknown'], domain: 'Process',
    summary: "Réserve pour aléas (contingency) : risques identifiés, dans la baseline, contrôlée par le PM. Réserve de management : risques non identifiés, hors baseline, contrôlée par la direction." },
  { id: 'risk-emv', topic: 'Valeur Monétaire Attendue (EMV)', tags: ['emv','probabilité','impact','décision'], domain: 'Process',
    summary: "EMV = Probabilité × Impact monétaire. Utilisé dans arbres de décision pour comparer alternatives. Risques positifs : EMV positive ; négatifs : négative." },

  // ===== EARNED VALUE MANAGEMENT =====
  { id: 'evm-formulas', topic: 'Earned Value Management (formules)', tags: ['evm','pv','ev','ac','cpi','spi','etc','eac'], domain: 'Process',
    summary: "PV (Planned Value), EV (Earned Value), AC (Actual Cost). CV = EV - AC. SV = EV - PV. CPI = EV/AC. SPI = EV/PV. EAC = BAC/CPI. ETC = EAC - AC. VAC = BAC - EAC." },
  { id: 'evm-interpretation', topic: 'Interprétation EVM', tags: ['evm','performance','coût','délai'], domain: 'Process',
    summary: "CPI/SPI > 1 : meilleure que prévu. < 1 : moins bonne. CV/SV positif : avance budget/délai. TCPI : performance future requise pour atteindre l'objectif." },

  // ===== ESTIMATION =====
  { id: 'estimation-techniques', topic: "Techniques d'estimation", tags: ['estimation','analogie','paramétrique','3 points','bottom-up'], domain: 'Process',
    summary: "Analogie (top-down, projets passés), Paramétrique (basée sur unités), 3-points (PERT : (O+4M+P)/6), Bottom-up (somme du WBS), Story Points (agile)." },

  // ===== PROCUREMENT =====
  { id: 'procurement-contracts', topic: 'Types de contrats', tags: ['contrat','prix fixe','remboursable','t&m','ffp','cpff','cpif','cpaf'], domain: 'Process',
    summary: "Prix fixe (FFP, FPIF, FP-EPA) : risque vendeur. Coûts remboursables (CPFF, CPIF, CPAF) : risque acheteur. T&M : hybride. Choix selon clarté du périmètre." },
  { id: 'procurement-audit', topic: "Audit d'approvisionnement", tags: ['audit','procurement','clôture','contrats'], domain: 'Process',
    summary: "Audit formel des processus d'approvisionnement lors de la clôture. Identifie succès/échecs, justifie soldes financiers, capture lessons learned contractuelles." },

  // ===== QUALITY =====
  { id: 'quality-tools', topic: 'Outils qualité', tags: ['pareto','fishbone','contrôle','histogramme','ishikawa'], domain: 'Process',
    summary: "7 outils qualité : diagrammes cause-effet (Ishikawa/fishbone), Pareto (80/20), histogramme, cartes de contrôle, fiches de relevés, diagrammes flux, nuages de points." },
  { id: 'quality-cost', topic: 'Coût de la qualité (COQ)', tags: ['cofq','coq','prévention','évaluation','défaillance'], domain: 'Process',
    summary: "Coûts de conformité (prévention + évaluation) vs Coûts de non-conformité (défaillance interne + externe). Investir en prévention réduit les défaillances coûteuses." },
  { id: 'quality-vs-grade', topic: 'Qualité vs Grade', tags: ['qualité','grade','conformité'], domain: 'Process',
    summary: "Qualité = conformité aux exigences ; Grade = catégorie de prestation. Une faible qualité est toujours mauvaise, un faible grade peut être acceptable." },

  // ===== SCOPE =====
  { id: 'scope-creep', topic: 'Scope Creep vs Gold Plating', tags: ['scope creep','gold plating','périmètre','contrôle'], domain: 'Process',
    summary: "Scope creep : ajout incontrôlé de fonctionnalités par les parties prenantes. Gold plating : équipe ajoute des fonctionnalités non demandées. Les deux sont à éviter via contrôle formel." },
  { id: 'wbs', topic: 'Work Breakdown Structure (WBS)', tags: ['wbs','décomposition','livrables','100%'], domain: 'Process',
    summary: "Décomposition hiérarchique des livrables. Règle des 100% : le WBS contient 100% du périmètre. Niveau le plus bas = work package, estimable et assignable." },

  // ===== ETHICS PMI =====
  { id: 'ethics-pmi', topic: "Code d'éthique PMI", tags: ['éthique','responsabilité','respect','équité','honnêteté','code'], domain: 'Business',
    summary: "4 valeurs : Responsabilité, Respect, Équité, Honnêteté. Conduite obligatoire vs idéale. Toute violation se signale via les canaux officiels. Pas de conflit d'intérêts, transparence." },

  // ===== TYPES OF METHODOLOGIES =====
  { id: 'methodology-selection', topic: 'Choisir la méthodologie', tags: ['prédictif','agile','hybride','stacey','cynefin'], domain: 'Process',
    summary: "Prédictif : exigences stables, environnement prévisible. Agile : forte incertitude, valeur émergente. Hybride : mix selon parties du projet. Matrice de Stacey, Cynefin." },

  // ===== STAKEHOLDER ANALYSIS =====
  { id: 'stakeholder-analysis', topic: 'Analyse des parties prenantes', tags: ['matrice','pouvoir','intérêt','influence','engagement'], domain: 'People',
    summary: "Matrices pouvoir/intérêt, influence/impact. Classification : unaware/resistant/neutral/supportive/leading. Adapter la stratégie d'engagement à chaque profil." },

  // ===== INTEGRATION =====
  { id: 'project-charter', topic: 'Charte de projet', tags: ['charte','démarrage','autorisation','sponsor'], domain: 'Process',
    summary: "Document fondateur signé par le sponsor. Autorise le projet, nomme le PM, énonce objectifs de haut niveau, parties prenantes clés, contraintes, hypothèses." },
  { id: 'lessons-learned', topic: "Retours d'expérience (lessons learned)", tags: ['lessons','retours','registre','opa','clôture'], domain: 'Process',
    summary: "Capturés en continu (pas seulement à la clôture). Intégrés au registre, puis aux actifs organisationnels (OPA) pour bénéficier aux futurs projets." },

  // ===== BUSINESS =====
  { id: 'benefits-management', topic: 'Gestion des bénéfices', tags: ['bénéfices','roi','npv','realization','plan'], domain: 'Business',
    summary: "Plan de gestion des bénéfices : identifier, livrer, mesurer la valeur. Souvent suivi APRÈS la clôture du projet (adoption, ROI, parts de marché)." },
  { id: 'business-case', topic: 'Business Case', tags: ['business case','justification','roi','revue'], domain: 'Business',
    summary: "Document justifiant l'initiation. Doit être réévalué en continu (revue de jalons). Si la valeur n'est plus attendue : pivot, replan ou arrêt." },
  { id: 'organizational-change', topic: 'Conduite du changement', tags: ['change management','adkar','adoption','résistance'], domain: 'Business',
    summary: "Modèle ADKAR (Awareness, Desire, Knowledge, Ability, Reinforcement). Kotter (8 étapes). Le projet livre la capacité, le change management livre l'adoption." }
];
