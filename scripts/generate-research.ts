import { getUncachableGoogleSheetClient } from '../src/lib/googleSheets'

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!

const research: Record<string, string> = {
  'retatrutide': `## Scientific Background

Retatrutide is a first-in-class **triple-agonist peptide** that simultaneously activates GLP-1, GIP, and glucagon receptors. This tri-agonist approach was developed to address the limitations of single- and dual-receptor therapies by leveraging the complementary metabolic effects of all three pathways.

## Key Research Findings

- **Phase 2 clinical trial (2023):** In a 48-week randomized trial published in *The New England Journal of Medicine*, retatrutide demonstrated dose-dependent body weight reductions of up to **24.2%** at the highest dose — the largest weight reduction reported for any anti-obesity medication in a Phase 2 study. Participants also showed significant improvements in glycemic control and cardiometabolic markers.

- **Glucagon receptor contribution:** Research has demonstrated that the glucagon component uniquely enhances energy expenditure and promotes hepatic lipid oxidation, effects not seen with GLP-1/GIP dual agonists. This results in greater fat mass reduction and improved liver fat clearance.

- **Metabolic health improvements:** Studies showed significant reductions in HbA1c, fasting glucose, triglycerides, and liver fat content across all dose groups, suggesting broad metabolic benefits beyond weight loss.

## References

- [Jastreboff AM, et al. "Triple-Hormone-Receptor Agonist Retatrutide for Obesity." *N Engl J Med.* 2023;389(6):514-526.](https://pubmed.ncbi.nlm.nih.gov/37385337/)
- [Rosenstock J, et al. "Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes." *Lancet.* 2023;402(10401):529-544.](https://pubmed.ncbi.nlm.nih.gov/37385280/)`,

  'tirzepatide': `## Scientific Background

Tirzepatide is a **dual GIP/GLP-1 receptor agonist** designed as a single molecule that activates both the glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1) receptors. This dual mechanism represents a paradigm shift in metabolic research by combining two incretin pathways.

## Key Research Findings

- **SURMOUNT-1 trial (2022):** A landmark Phase 3 trial published in *The New England Journal of Medicine* demonstrated that tirzepatide achieved body weight reductions of up to **22.5%** over 72 weeks in participants with obesity — significantly exceeding results from GLP-1-only therapies. Over one-third of participants on the highest dose lost more than 25% of body weight.

- **SURPASS program:** Across the SURPASS clinical trial series in type 2 diabetes, tirzepatide showed superior HbA1c reductions compared to semaglutide, with up to **2.4% reduction** in HbA1c and greater proportions of participants reaching glycemic targets.

- **GIP receptor role:** Research has elucidated that GIP receptor activation enhances insulin sensitivity in adipose tissue, complements GLP-1-mediated appetite suppression, and may improve lipid metabolism — explaining the enhanced efficacy of the dual-agonist approach.

## References

- [Jastreboff AM, et al. "Tirzepatide Once Weekly for the Treatment of Obesity." *N Engl J Med.* 2022;387(4):327-340.](https://pubmed.ncbi.nlm.nih.gov/35658024/)
- [Frías JP, et al. "Tirzepatide versus Semaglutide Once Weekly in Patients with Type 2 Diabetes." *N Engl J Med.* 2021;385(6):503-515.](https://pubmed.ncbi.nlm.nih.gov/34170647/)
- [Willard FS, et al. "Tirzepatide is an imbalanced and biased dual GIP and GLP-1 receptor agonist." *JCI Insight.* 2020;5(17):e140532.](https://pubmed.ncbi.nlm.nih.gov/32730232/)`,

  'mazdutide': `## Scientific Background

Mazdutide is a **dual GLP-1/glucagon receptor agonist** developed to combine the appetite-suppressing effects of GLP-1 receptor activation with the energy expenditure-enhancing properties of glucagon receptor signaling. Unlike GLP-1-only agonists, this dual mechanism targets both energy intake and energy output.

## Key Research Findings

- **Phase 2 clinical data (2023):** Studies presented at major endocrinology conferences showed mazdutide achieved clinically meaningful weight loss of up to **14.4%** over 24 weeks, with concurrent improvements in glycemic parameters and liver fat reduction.

- **Hepatic fat reduction:** The glucagon receptor component has been shown to significantly reduce hepatic steatosis (liver fat), a finding particularly relevant for NAFLD/MASH research. Preclinical models demonstrated up to 60% reduction in liver triglyceride content.

- **Energy expenditure effects:** Unlike GLP-1 single agonists which primarily reduce food intake, mazdutide's glucagon activity increases resting energy expenditure, potentially helping to mitigate the metabolic adaptation (reduced metabolic rate) often seen with caloric restriction.

## References

- [Ji L, et al. "Mazdutide, a dual GLP-1/glucagon receptor agonist, for Chinese adults with type 2 diabetes." *Lancet Diabetes Endocrinol.* 2023.](https://pubmed.ncbi.nlm.nih.gov/37356445/)
- [Ambery P, et al. "MEDI0382, a GLP-1 and glucagon receptor dual agonist, in obese or overweight patients with type 2 diabetes." *Lancet.* 2018;391(10140):2607-2618.](https://pubmed.ncbi.nlm.nih.gov/29945727/)`,

  'dsip 15': `## Scientific Background

Delta Sleep-Inducing Peptide (DSIP) is a **naturally occurring neuropeptide** first isolated from rabbit brain venous blood during electrically induced sleep in 1977 by Schoenenberger and Monnier. This nonapeptide (Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu) has been the subject of extensive research into sleep regulation and neuroendocrine modulation.

## Key Research Findings

- **Sleep architecture modulation:** Research has demonstrated that DSIP selectively enhances **slow-wave (delta) sleep** without producing sedation or disrupting normal sleep stage cycling. Unlike pharmacological sleep aids, it appears to promote physiological sleep patterns by modulating central sleep-regulating mechanisms.

- **Stress and hormonal effects:** Studies show DSIP modulates the hypothalamic-pituitary-adrenal (HPA) axis, reducing ACTH and cortisol levels under stress conditions. It has also been shown to influence growth hormone secretion patterns and LH release, suggesting broad neuroendocrine regulatory functions.

- **Analgesic properties:** Research published in *Peptides* demonstrated that DSIP exhibits analgesic effects through opioid receptor-related mechanisms, with studies showing modulation of enkephalin levels and pain thresholds in animal models.

## References

- [Schoenenberger GA, Monnier M. "Characterization of a delta-electroencephalogram sleep-inducing peptide." *Proc Natl Acad Sci USA.* 1977;74(3):1282-1286.](https://pubmed.ncbi.nlm.nih.gov/265573/)
- [Graf MV, Kastin AJ. "Delta-sleep-inducing peptide (DSIP): a review." *Neurosci Biobehav Rev.* 1984;8(1):83-93.](https://pubmed.ncbi.nlm.nih.gov/6145132/)`,

  'pt141': `## Scientific Background

PT-141 (Bremelanotide) is a synthetic cyclic heptapeptide analog of **alpha-melanocyte-stimulating hormone (α-MSH)**. It was derived from Melanotan II and acts as a non-selective agonist at melanocortin receptors MC1R, MC3R, MC4R, and MC5R, with its primary effects mediated through **MC3R and MC4R in the central nervous system**.

## Key Research Findings

- **Central mechanism of action:** Unlike PDE5 inhibitors that act peripherally on blood vessels, PT-141 works through the **hypothalamic melanocortin system** to modulate arousal. Functional MRI studies have shown that bremelanotide activates brain regions associated with desire and reward processing, confirming its central nervous system mechanism.

- **Clinical efficacy (RECONNECT trials):** Phase 3 clinical trials published in *Obstetrics & Gynecology* demonstrated statistically significant improvements in desire, arousal, and overall satisfaction in premenopausal women with hypoactive sexual desire disorder (HSDD), leading to FDA approval in 2019.

- **Melanocortin receptor research:** PT-141 has been instrumental in elucidating the role of the melanocortin system in sexual behavior. Research shows MC4R activation in the medial preoptic area and ventromedial hypothalamus mediates the peptide's effects on sexual motivation.

## References

- [Kingsberg SA, et al. "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder." *Obstet Gynecol.* 2019;134(5):899-908.](https://pubmed.ncbi.nlm.nih.gov/31599840/)
- [Clayton AH, et al. "Bremelanotide for female sexual dysfunctions in premenopausal women: a randomized, placebo-controlled dose-finding trial." *Women's Health.* 2016;12(3):325-337.](https://pubmed.ncbi.nlm.nih.gov/27068969/)`,

  'll37': `## Scientific Background

LL-37 is the sole human **cathelicidin antimicrobial peptide**, cleaved from its precursor protein hCAP18 by proteinase 3. This 37-amino acid, amphipathic alpha-helical peptide serves as a critical component of the innate immune system, with broad-spectrum antimicrobial and immunomodulatory functions.

## Key Research Findings

- **Broad-spectrum antimicrobial activity:** LL-37 demonstrates potent activity against gram-positive and gram-negative bacteria, fungi, and enveloped viruses by disrupting microbial membranes. Research published in *The Journal of Immunology* showed it effectively kills antibiotic-resistant strains including MRSA and *P. aeruginosa* biofilms.

- **Immunomodulatory functions:** Beyond direct antimicrobial action, LL-37 acts as a chemokine, recruiting neutrophils, monocytes, and T-cells to infection sites. It promotes dendritic cell maturation, modulates TLR signaling, and can shift macrophage polarization — functioning as a bridge between innate and adaptive immunity.

- **Wound healing and angiogenesis:** Studies have demonstrated that LL-37 promotes wound closure through stimulating keratinocyte migration, fibroblast activation, and angiogenesis via FPRL1 receptor activation. It has shown efficacy in chronic wound models where healing is impaired.

## References

- [Vandamme D, et al. "A comprehensive summary of LL-37, the factotum human cathelicidin peptide." *Cell Immunol.* 2012;280(1):22-35.](https://pubmed.ncbi.nlm.nih.gov/23246832/)
- [Kahlenberg JM, Kaplan MJ. "Little peptide, big effects: the role of LL-37 in inflammation and autoimmune disease." *J Immunol.* 2013;191(10):4895-4901.](https://pubmed.ncbi.nlm.nih.gov/24185823/)`,

  'ipamorelin': `## Scientific Background

Ipamorelin is a **pentapeptide growth hormone secretagogue** (Aib-His-D-2-Nal-D-Phe-Lys-NH2) that selectively stimulates growth hormone release from the anterior pituitary by mimicking ghrelin at the growth hormone secretagogue receptor (GHS-R1a). It is distinguished by its exceptional selectivity among GH secretagogues.

## Key Research Findings

- **Selective GH release:** A pivotal study published in *Endocrinology* demonstrated that ipamorelin stimulates GH release in a dose-dependent manner **without significantly affecting** ACTH, cortisol, prolactin, FSH, LH, or TSH levels — a selectivity profile unmatched by other GH secretagogues like GHRP-6 or GHRP-2.

- **Bone density research:** Studies in ovariectomized rats (a model for postmenopausal osteoporosis) showed that ipamorelin treatment increased bone mineral density, cortical bone thickness, and biomechanical strength, suggesting potential applications in skeletal health research.

- **Gastrointestinal motility:** Research published in *Neurogastroenterology & Motility* demonstrated that ipamorelin accelerates gastric emptying and colonic transit through GHS-R activation, with clinical studies showing efficacy in post-operative ileus — highlighting its utility beyond GH-axis research.

## References

- [Raun K, et al. "Ipamorelin, the first selective growth hormone secretagogue." *Eur J Endocrinol.* 1998;139(5):552-561.](https://pubmed.ncbi.nlm.nih.gov/9849822/)
- [Svensson J, et al. "The GH secretagogues ipamorelin and GH-releasing peptide-6 increase bone mineral content in adult female rats." *J Endocrinol.* 2000;165(3):569-577.](https://pubmed.ncbi.nlm.nih.gov/10828840/)`,

  '4x alpha': `## Scientific Background

Multi-peptide blends represent a growing area of research investigating **synergistic interactions** between complementary growth-promoting and recovery-supporting peptides. The 4X Alpha formulation combines four peptides targeting overlapping and complementary physiological pathways.

## Key Research Findings

- **Peptide synergy research:** Published literature supports the concept that combinations of GH secretagogues acting through different receptor mechanisms can produce **synergistic rather than merely additive** effects on GH release. Studies in *The Journal of Clinical Endocrinology & Metabolism* demonstrated that combining GHRH analogs with ghrelin mimetics amplifies pulsatile GH secretion beyond what either produces alone.

- **Multi-pathway activation:** Research shows that targeting both the GHRH receptor (hypothalamic) and GHS-R (pituitary) pathways simultaneously results in more physiological GH release patterns, with maintained pulsatility and greater peak amplitudes compared to single-agent stimulation.

- **Recovery and repair:** Preclinical studies on combined growth factor and repair peptide protocols have demonstrated enhanced tissue repair outcomes including faster wound closure, improved collagen deposition, and accelerated functional recovery in animal models.

## References

- [Veldhuis JD, et al. "Joint Mechanisms of Impaired Growth-Hormone Pulse Renewal in Aging." *J Clin Endocrinol Metab.* 2009;94(1):234-245.](https://pubmed.ncbi.nlm.nih.gov/18854400/)
- [Arvat E, et al. "Endocrine activities of ghrelin, a natural growth hormone secretagogue." *Trends Endocrinol Metab.* 2001;12(3):118-122.](https://pubmed.ncbi.nlm.nih.gov/11306336/)`,

  '2x alpha cjc/ipa': `## Scientific Background

The CJC-1295/Ipamorelin combination pairs a **GHRH analog** (CJC-1295) with a **ghrelin mimetic** (Ipamorelin) to achieve synergistic growth hormone release through two complementary receptor systems. This combination exploits the well-documented amplification effect of dual GH-axis stimulation.

## Key Research Findings

- **Synergistic GH release:** Research published in *The Journal of Clinical Endocrinology & Metabolism* has established that co-administration of GHRH analogs and GH secretagogues produces **synergistic GH release** — typically 2-3x greater than the sum of individual responses. This is because GHRH sets the amplitude of GH pulses while ghrelin mimetics increase pulse frequency.

- **CJC-1295 pharmacokinetics:** Studies by Teichman et al. demonstrated that CJC-1295 with DAC produces sustained GH elevation for 6-8 days after a single injection, with **2-10 fold increases in mean GH levels** and 1.5-3 fold increases in IGF-1. The extended half-life is achieved through albumin binding via the DAC moiety.

- **Ipamorelin selectivity:** When combined, ipamorelin's selectivity ensures that the amplified GH response occurs without unwanted increases in cortisol or prolactin, maintaining a clean hormonal profile throughout the research protocol.

## References

- [Teichman SL, et al. "Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295." *J Clin Endocrinol Metab.* 2006;91(3):799-805.](https://pubmed.ncbi.nlm.nih.gov/16352683/)
- [Raun K, et al. "Ipamorelin, the first selective growth hormone secretagogue." *Eur J Endocrinol.* 1998;139(5):552-561.](https://pubmed.ncbi.nlm.nih.gov/9849822/)`,

  'thymosin alpha 1': `## Scientific Background

Thymosin Alpha 1 (Tα1) is a **28-amino acid peptide** naturally produced by the thymus gland that plays a central role in immune system development and regulation. It was first isolated by Allan Goldstein in 1977 and has since become one of the most extensively studied immunomodulatory peptides, with regulatory approval in over 35 countries.

## Key Research Findings

- **T-cell maturation and function:** Research published in *Annals of the New York Academy of Sciences* demonstrated that Tα1 promotes differentiation of CD34+ progenitor cells into mature T-cells, enhances T-cell receptor signaling, and restores T-cell function in immunocompromised models. It acts through TLR2, TLR9, and IRF pathways.

- **Dendritic cell activation:** Studies show Tα1 promotes maturation and cross-presentation capabilities of dendritic cells, enhancing antigen-specific immune responses. This has made it a subject of vaccine adjuvant research, with demonstrated improvements in vaccine efficacy in elderly and immunocompromised populations.

- **Clinical applications:** A meta-analysis published in *International Immunopharmacology* reviewing multiple randomized controlled trials found that Tα1 supplementation significantly improved immune recovery and clinical outcomes in hepatitis B, hepatitis C, and as an immune adjunct in various clinical settings.

## References

- [Romani L, et al. "Thymosin alpha1 activates dendritic cell tryptophan catabolism and establishes a regulatory environment for balance of inflammation and tolerance." *Blood.* 2006;108(7):2265-2274.](https://pubmed.ncbi.nlm.nih.gov/16740584/)
- [Goldstein AL, et al. "Thymosin alpha1: isolation and sequence analysis of an immunologically active thymic polypeptide." *Proc Natl Acad Sci USA.* 1977;74(2):725-729.](https://pubmed.ncbi.nlm.nih.gov/265543/)`,

  'ghk-cu': `## Scientific Background

GHK-Cu is a naturally occurring **tripeptide-copper complex** (glycyl-L-histidyl-L-lysine:copper(II)) first identified by Dr. Loren Pickart in 1973. Present in human plasma at approximately 200 ng/mL in youth, GHK-Cu levels decline with age, correlating with reduced regenerative capacity.

## Key Research Findings

- **Gene expression modulation:** Landmark research by Pickart et al. using Broad Institute's Connectivity Map demonstrated that GHK modulates the expression of **4,000+ human genes** — roughly 6% of the human genome. It upregulates genes associated with tissue repair (collagens, decorin, elastin) and downregulates genes linked to inflammation and tissue destruction (metalloproteinases).

- **Wound healing acceleration:** Multiple studies have demonstrated GHK-Cu's ability to accelerate wound healing by stimulating collagen synthesis, glycosaminoglycan production, and angiogenesis. Research published in *The Journal of Biological Chemistry* showed it activates integrins and promotes dermal fibroblast migration and contraction.

- **Antioxidant enzyme activation:** GHK-Cu serves as a copper delivery vehicle, activating copper-dependent enzymes including superoxide dismutase (SOD), cytochrome c oxidase, and lysyl oxidase. Research shows it reduces oxidative damage markers and iron-induced lipid peroxidation in tissue models.

## References

- [Pickart L, Vasquez-Soltero JM, Margolina A. "GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration." *Biomed Res Int.* 2015;2015:648108.](https://pubmed.ncbi.nlm.nih.gov/26236730/)
- [Pickart L, Margolina A. "Regenerative and Protective Actions of the GHK-Cu Peptide in the Light of the New Gene Data." *Int J Mol Sci.* 2018;19(7):1987.](https://pubmed.ncbi.nlm.nih.gov/29986520/)`,

  'epithalon': `## Scientific Background

Epithalon (Ala-Glu-Asp-Gly) is a synthetic tetrapeptide modeled after **Epithalamin**, a natural peptide extract from the pineal gland. It was developed by Professor Vladimir Khavinson at the Saint Petersburg Institute of Bioregulation and Gerontology and represents one of the most studied compounds in telomere biology and aging research.

## Key Research Findings

- **Telomerase activation:** Research published in *Bulletin of Experimental Biology and Medicine* demonstrated that Epithalon activates **telomerase in human somatic cells**, increasing telomere length and extending the replicative capacity of fibroblast cultures by 44%. This is significant because somatic cells normally lack sufficient telomerase activity, leading to progressive telomere shortening with each division.

- **Longevity studies:** In a landmark study on long-lived individuals, Khavinson et al. showed that Epithalon treatment in elderly subjects normalized melatonin secretion, improved endocrine function, and showed statistically significant improvements in physiological markers of aging compared to controls over a 6-year follow-up period.

- **Melatonin and circadian regulation:** Studies demonstrate that Epithalon stimulates pineal gland function, normalizing melatonin production in aged subjects to levels comparable to younger individuals. This restoration of circadian rhythm has downstream effects on immune function, antioxidant capacity, and neuroendocrine balance.

## References

- [Khavinson VK, et al. "Peptide Epitalon activates chromatin at the old age." *Neuro Endocrinol Lett.* 2003;24(5):329-333.](https://pubmed.ncbi.nlm.nih.gov/14647006/)
- [Anisimov VN, Khavinson VKh. "Peptide bioregulation of aging: results and prospects." *Biogerontology.* 2010;11(2):139-149.](https://pubmed.ncbi.nlm.nih.gov/19830583/)`,

  'pinealon': `## Scientific Background

Pinealon (Glu-Asp-Arg) is a synthetic **tripeptide bioregulator** developed at the Saint Petersburg Institute of Bioregulation and Gerontology. It belongs to a class of short regulatory peptides designed to interact with specific DNA sequences and modulate gene expression in central nervous system tissues.

## Key Research Findings

- **Neuroprotective effects:** Research published in *Bulletin of Experimental Biology and Medicine* demonstrated that Pinealon protects cortical neurons against beta-amyloid toxicity and oxidative stress-induced apoptosis. In cell culture models, it reduced neuronal death by up to 40% under toxic conditions, suggesting neuroprotective mechanisms relevant to neurodegenerative research.

- **Blood-brain barrier penetration:** Studies using radiolabeled peptide tracking confirmed that Pinealon crosses the blood-brain barrier and accumulates in brain tissue, enabling direct interaction with CNS neurons — a critical property for any neuroactive compound.

- **Gene expression in brain tissue:** Research has shown that Pinealon modulates expression of genes involved in neuronal survival, synaptic plasticity, and neurotransmitter synthesis. It influences serotonin and melatonin pathways, supporting its role in cognitive function and neuroprotection.

## References

- [Khavinson VKh, et al. "Neuroprotective effects of tripeptide Pinealon." *Bull Exp Biol Med.* 2011;151(2):224-227.](https://pubmed.ncbi.nlm.nih.gov/22238754/)
- [Khavinson V, et al. "Short Peptides Stimulate Cell Regeneration." *Open Journal of Genetics.* 2014;4(6):414-420.](https://www.scirp.org/journal/paperinformation?paperid=52396)`,

  'ss31': `## Scientific Background

SS-31 (D-Arg-Dmt-Lys-Phe-NH2, also known as Elamipretide or Bendavia) is a **mitochondria-targeted tetrapeptide** that selectively concentrates more than 1000-fold in the inner mitochondrial membrane. Developed by Dr. Hazel Szeto at Weill Cornell Medicine, it represents a novel approach to targeting mitochondrial dysfunction.

## Key Research Findings

- **Cardiolipin interaction:** Research published in the *British Journal of Pharmacology* demonstrated that SS-31 binds selectively to **cardiolipin**, a phospholipid unique to the inner mitochondrial membrane that is essential for optimal electron transport chain function. This interaction improves cristae architecture and ATP synthesis efficiency while reducing electron leak and ROS generation.

- **Cardiac protection:** In ischemia-reperfusion injury models, SS-31 reduced infarct size by 50-60% when administered during reperfusion. Studies published in *Circulation* showed it preserved mitochondrial structure, prevented cytochrome c release, and reduced cardiomyocyte apoptosis.

- **Age-related decline:** Research in aged mice demonstrated that SS-31 treatment reversed age-related mitochondrial dysfunction within hours, restored cardiac diastolic function, and improved exercise tolerance. Studies showed normalization of the mitochondrial proteome to patterns resembling younger animals.

## References

- [Szeto HH. "First-in-class cardiolipin-protective compound as a therapeutic agent to restore mitochondrial bioenergetics." *Br J Pharmacol.* 2014;171(8):2029-2050.](https://pubmed.ncbi.nlm.nih.gov/24117165/)
- [Dai DF, et al. "Mitochondrial targeted antioxidant peptide ameliorates hypertensive cardiomyopathy." *J Am Coll Cardiol.* 2011;58(1):73-82.](https://pubmed.ncbi.nlm.nih.gov/21620606/)`,

  'nad': `## Scientific Background

NAD+ (Nicotinamide Adenine Dinucleotide) is an essential **coenzyme and signaling molecule** present in all living cells. It exists in oxidized (NAD+) and reduced (NADH) forms and participates in over 500 enzymatic reactions. Research in the last two decades has revealed its critical role as a substrate for **sirtuins, PARPs, and CD38** — enzymes central to aging and cellular repair.

## Key Research Findings

- **Age-related NAD+ decline:** Landmark research by Imai and Guarente published in *Trends in Cell Biology* established that NAD+ levels decline by approximately **50% between ages 40-60** in human tissue, contributing to mitochondrial dysfunction, DNA damage accumulation, and metabolic deterioration — a concept now known as the "NAD world" hypothesis.

- **Sirtuin activation and longevity:** Research published in *Cell* demonstrated that NAD+ supplementation activates SIRT1 and SIRT3, improving mitochondrial function, enhancing oxidative metabolism, and extending healthspan in mouse models. Treated animals showed improved insulin sensitivity, reduced inflammation, and enhanced exercise capacity.

- **DNA repair and genomic stability:** Studies published in *Science* showed that declining NAD+ impairs PARP1-mediated DNA repair, leading to genomic instability. NAD+ repletion restored DNA repair capacity and reversed age-related tissue dysfunction in multiple organ systems.

## References

- [Yoshino J, et al. "NAD+ Intermediates: The Biology and Therapeutic Potential of NMN and NR." *Cell Metab.* 2018;27(3):513-528.](https://pubmed.ncbi.nlm.nih.gov/29249689/)
- [Imai SI, Guarente L. "NAD+ and sirtuins in aging and disease." *Trends Cell Biol.* 2014;24(8):464-471.](https://pubmed.ncbi.nlm.nih.gov/24786309/)
- [Li J, et al. "A conserved NAD+ binding pocket that regulates protein-protein interactions during aging." *Science.* 2017;355(6331):1312-1317.](https://pubmed.ncbi.nlm.nih.gov/28336669/)`,

  'glutathione': `## Scientific Background

Glutathione (γ-L-glutamyl-L-cysteinyl-glycine) is the most abundant **intracellular thiol antioxidant**, present at millimolar concentrations in virtually all mammalian cells. It serves as the master regulator of cellular redox homeostasis, participating in detoxification, immune function, and protein thiol maintenance.

## Key Research Findings

- **Redox regulation:** Research published in the *Journal of Biological Chemistry* established glutathione as the primary intracellular buffer against oxidative stress. The GSH/GSSG ratio is the principal determinant of cellular redox potential, and shifts in this ratio regulate cell proliferation, differentiation, and apoptosis through redox-sensitive transcription factors including NF-κB, AP-1, and Nrf2.

- **Immune function:** Studies published in *Proceedings of the Nutrition Society* demonstrated that glutathione is essential for lymphocyte proliferation, natural killer cell activity, and cytokine production. GSH depletion impairs T-cell function, while supplementation enhances both innate and adaptive immune responses, particularly in aging populations.

- **Detoxification and hepatoprotection:** Glutathione is the essential cofactor for glutathione S-transferase enzymes in Phase II liver detoxification, conjugating and neutralizing electrophilic toxins, drug metabolites, and environmental pollutants. Research shows GSH depletion is a hallmark of liver disease progression.

## References

- [Forman HJ, Zhang H, Rinna A. "Glutathione: overview of its protective roles, measurement, and biosynthesis." *Mol Aspects Med.* 2009;30(1-2):1-12.](https://pubmed.ncbi.nlm.nih.gov/18796312/)
- [Dröge W, Breitkreutz R. "Glutathione and immune function." *Proc Nutr Soc.* 2000;59(4):595-600.](https://pubmed.ncbi.nlm.nih.gov/11115795/)`,

  'cartalax': `## Scientific Background

Cartalax (Ala-Glu-Asp) is a synthetic **tripeptide bioregulator** developed through the bioregulatory peptide research program at the Saint Petersburg Institute of Bioregulation and Gerontology. It was specifically designed to target cartilage tissue and support musculoskeletal function through gene-level regulation.

## Key Research Findings

- **Cartilage matrix regulation:** Research published in *Bulletin of Experimental Biology and Medicine* demonstrated that Cartalax stimulates the expression of genes involved in cartilage extracellular matrix synthesis, including **type II collagen and aggrecan** — the primary structural components of articular cartilage. This gene-level activity distinguishes it from symptomatic treatments.

- **Chondrocyte viability:** Studies in chondrocyte cell cultures showed that Cartalax promotes cell proliferation and protects against apoptosis under inflammatory conditions. Treatment with the peptide maintained chondrocyte phenotype and prevented dedifferentiation, a common problem in cartilage degeneration.

- **Bioregulatory peptide mechanism:** Research by Khavinson et al. has shown that short regulatory peptides like Cartalax interact with specific DNA sequences in gene promoter regions, modulating transcription in a tissue-specific manner. This epigenetic mechanism provides targeted biological activity without systemic hormonal effects.

## References

- [Khavinson V, et al. "Short Peptides Stimulate Cell Regeneration." *Open Journal of Genetics.* 2014;4(6):414-420.](https://www.scirp.org/journal/paperinformation?paperid=52396)
- [Khavinson VKh, et al. "Peptide bioregulation of aging: results and prospects." *Biogerontology.* 2010;11(2):139-149.](https://pubmed.ncbi.nlm.nih.gov/19830583/)`,

  'tb500': `## Scientific Background

TB-500 is a synthetic fragment of **Thymosin Beta-4 (Tβ4)**, a 43-amino acid peptide that is one of the most abundant intracellular proteins. Tβ4 was first identified in the thymus but is expressed in virtually all tissues and plays a fundamental role in cell motility, tissue repair, and inflammation modulation through its primary function as a **G-actin sequestering protein**.

## Key Research Findings

- **Cardiac regeneration:** Groundbreaking research published in *Nature* by Smart et al. demonstrated that Tβ4 reactivates quiescent epicardial progenitor cells in the adult heart, promoting their differentiation into new cardiomyocytes and vascular smooth muscle cells. This finding established Tβ4 as a key factor in cardiac repair following myocardial infarction.

- **Actin regulation and cell migration:** Studies published in *The EMBO Journal* showed that Tβ4 promotes cell migration by sequestering G-actin monomers, thereby increasing the pool available for rapid F-actin polymerization at the leading edge of migrating cells. This mechanism is essential for wound healing, angiogenesis, and tissue remodeling.

- **Anti-inflammatory properties:** Research in *The FASEB Journal* demonstrated that Tβ4 suppresses NF-κB activation and reduces pro-inflammatory cytokine production. In corneal injury models, it significantly reduced inflammation while promoting epithelial healing and reducing scar formation.

## References

- [Smart N, et al. "Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization." *Nature.* 2007;445(7124):177-182.](https://pubmed.ncbi.nlm.nih.gov/17108969/)
- [Goldstein AL, et al. "Thymosin beta4: actin-sequestering protein moonlights to repair injured tissues." *Trends Mol Med.* 2005;11(9):421-429.](https://pubmed.ncbi.nlm.nih.gov/16099219/)`,

  'thymalin': `## Scientific Background

Thymalin is a **bioregulatory peptide complex** extracted from calf thymus gland, developed by Professors Khavinson and Morozov at the Military Medical Academy in Saint Petersburg. It contains a standardized mixture of thymic peptides with immunoregulatory activity and has been studied for over four decades.

## Key Research Findings

- **Immune restoration in aging:** In a landmark 15-year clinical study published in *Bulletin of Experimental Biology and Medicine*, Khavinson et al. demonstrated that Thymalin treatment in elderly patients (60-80 years) normalized T-cell subpopulations, restored thymic function markers, and was associated with a **statistically significant reduction in mortality** compared to controls over the follow-up period.

- **T-cell subset normalization:** Research shows that Thymalin restores the CD4/CD8 ratio in immunodeficient models, promotes thymopoiesis, and enhances IL-2 production and lymphocyte proliferative responses. These effects have been demonstrated in both aged animals and clinical studies in immunocompromised patients.

- **Neuroendocrine-immune interactions:** Studies reveal that Thymalin modulates the bidirectional communication between the immune and neuroendocrine systems, normalizing cortisol/DHEA ratios and melatonin secretion patterns in aged subjects — supporting the concept that immune aging (immunosenescence) is linked to neuroendocrine decline.

## References

- [Khavinson VKh, Morozov VG. "Peptides of pineal gland and thymus prolong human life." *Neuro Endocrinol Lett.* 2003;24(3-4):233-240.](https://pubmed.ncbi.nlm.nih.gov/14523363/)
- [Khavinson V, et al. "Peptide bioregulation of aging." *Biogerontology.* 2010;11(2):139-149.](https://pubmed.ncbi.nlm.nih.gov/19830583/)`,

  'mots-c': `## Scientific Background

MOTS-c (Mitochondrial Open Reading Frame of the 12S rRNA Type-c) is a **mitochondrial-derived peptide (MDP)** discovered by Dr. Changhan Lee at the University of Southern California in 2015. This 16-amino acid peptide is encoded within the mitochondrial genome and represents a novel class of signaling molecules that mediate mitochondrial-nuclear communication.

## Key Research Findings

- **AMPK pathway activation:** Research published in *Cell Metabolism* by Lee et al. demonstrated that MOTS-c activates the AMPK-SIRT1-PGC1α signaling cascade, enhancing glucose uptake, increasing fatty acid oxidation, and improving insulin sensitivity. Treated mice showed prevention of age-dependent and high-fat diet-induced insulin resistance.

- **Nuclear translocation under stress:** A groundbreaking 2018 study in *Cell Metabolism* revealed that MOTS-c translocates from the cytoplasm to the nucleus during metabolic stress, where it directly regulates **adaptive nuclear gene expression** through interactions with antioxidant response elements (ARE). This was the first demonstration of a mitochondrial-encoded peptide directly regulating nuclear transcription.

- **Exercise mimetic properties:** Research showed that MOTS-c levels increase during exercise in humans, and exogenous MOTS-c administration in aged mice improved physical performance, enhanced skeletal muscle metabolism, and replicated many molecular signatures of exercise — including activation of AMPK, improved mitochondrial function, and enhanced glucose disposal.

## References

- [Lee C, et al. "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance." *Cell Metab.* 2015;21(3):443-454.](https://pubmed.ncbi.nlm.nih.gov/25738459/)
- [Kim KH, et al. "Mitochondrial-derived peptides in aging and age-related diseases." *GeroScience.* 2021;43(3):1113-1121.](https://pubmed.ncbi.nlm.nih.gov/33011925/)`,

  'b12': `## Scientific Background

Vitamin B12 (cobalamin) is an essential **cobalt-containing vitamin** that exists in several forms, with methylcobalamin and adenosylcobalamin being the metabolically active coenzymes. It is required for two critical enzymatic reactions: **methionine synthase** (cytoplasmic, using methylcobalamin) and **methylmalonyl-CoA mutase** (mitochondrial, using adenosylcobalamin).

## Key Research Findings

- **Neurological function:** Research published in *The New England Journal of Medicine* established that B12 deficiency causes demyelination of peripheral nerves, spinal cord, and cerebral white matter through impaired methylation of myelin basic protein. Even subclinical deficiency (serum levels 200-350 pg/mL) is associated with cognitive decline, with studies showing supplementation can improve memory and processing speed.

- **Methylation and homocysteine metabolism:** B12 serves as a cofactor for methionine synthase, which converts homocysteine to methionine — the precursor to S-adenosylmethionine (SAM), the universal methyl donor. Research shows that B12 deficiency leads to elevated homocysteine, an independent risk factor for cardiovascular disease and neurodegeneration.

- **Mitochondrial energy metabolism:** As adenosylcobalamin, B12 is essential for the mitochondrial enzyme methylmalonyl-CoA mutase, which is critical for the catabolism of odd-chain fatty acids and branched-chain amino acids. Deficiency leads to methylmalonic acid accumulation and impaired mitochondrial energy production.

## References

- [Stabler SP. "Vitamin B12 deficiency." *N Engl J Med.* 2013;368(2):149-160.](https://pubmed.ncbi.nlm.nih.gov/23301732/)
- [Green R, et al. "Vitamin B12 deficiency." *Nature Reviews Disease Primers.* 2017;3:17040.](https://pubmed.ncbi.nlm.nih.gov/28660890/)`,

  'bpc 157': `## Scientific Background

BPC-157 (Body Protection Compound-157) is a **pentadecapeptide** (15 amino acids) derived from a protein found in human gastric juice. It was first described by Sikiric et al. at the University of Zagreb and has been the subject of extensive preclinical research, with over 100 published studies investigating its cytoprotective and regenerative properties.

## Key Research Findings

- **Tendon and ligament repair:** Research published in the *Journal of Orthopaedic Research* demonstrated that BPC-157 significantly accelerates tendon healing by promoting tendon fibroblast migration, collagen synthesis, and angiogenesis at the injury site. Studies in transected Achilles tendon and medial collateral ligament models showed improved biomechanical properties and faster functional recovery.

- **Gastrointestinal cytoprotection:** Multiple studies published in *Life Sciences* and *Journal of Pharmacological Sciences* have demonstrated BPC-157's remarkable gastroprotective effects. It counteracts damage from NSAIDs, alcohol, and various toxic agents, promoting mucosal healing through mechanisms involving NO system modulation, prostaglandin regulation, and growth factor upregulation.

- **Nitric oxide (NO) system modulation:** A key mechanism elucidated in research is BPC-157's interaction with the NO system. Studies show it modulates both constitutive and inducible NOS activity, maintaining NO homeostasis and potentially explaining its broad protective effects across multiple organ systems including cardiovascular, neurological, and gastrointestinal.

## References

- [Sikiric P, et al. "Brain-gut Axis and Pentadecapeptide BPC 157: Theoretical and Practical Implications." *Curr Neuropharmacol.* 2016;14(8):857-865.](https://pubmed.ncbi.nlm.nih.gov/27306034/)
- [Seiwerth S, et al. "BPC 157 and Standard Angiogenic Growth Factors. Gastrointestinal Tract Healing, Lesson from Tendon, Ligament, Muscle and Bone Healing." *Curr Pharm Des.* 2018;24(18):1972-1989.](https://pubmed.ncbi.nlm.nih.gov/29737246/)`,

  'bpc 157 10mg/tb500 10 mg wolverine': `## Scientific Background

The BPC-157/TB-500 combination represents a research approach investigating **synergistic tissue repair mechanisms** by pairing two peptides with complementary regenerative pathways. BPC-157 acts primarily through NO system modulation and growth factor upregulation, while TB-500 (Thymosin Beta-4) functions through actin regulation and cell migration promotion.

## Key Research Findings

- **Complementary repair mechanisms:** BPC-157 promotes angiogenesis and growth factor expression (VEGF, EGF, FGF) while TB-500 upregulates actin to enable cell migration to injury sites. Research suggests these mechanisms address different phases of the wound healing cascade — BPC-157 creating the vascular infrastructure for repair while TB-500 mobilizes reparative cells to the site.

- **Anti-inflammatory synergy:** Studies on individual components show that BPC-157 modulates the NO system and reduces inflammatory cytokines, while TB-500 suppresses NF-κB activation and pro-inflammatory signaling. The combined anti-inflammatory effect may exceed what either peptide achieves independently.

- **Tissue-specific repair:** Preclinical research on the individual peptides demonstrates effectiveness across overlapping tissue types: BPC-157 shows particular efficacy in tendon, GI tract, and nerve repair, while TB-500 excels in cardiac, dermal, and corneal models. The combination provides broader tissue coverage for multi-system repair studies.

## References

- [Sikiric P, et al. "Brain-gut Axis and Pentadecapeptide BPC 157." *Curr Neuropharmacol.* 2016;14(8):857-865.](https://pubmed.ncbi.nlm.nih.gov/27306034/)
- [Smart N, et al. "Thymosin beta4 induces adult epicardial progenitor mobilization and neovascularization." *Nature.* 2007;445(7124):177-182.](https://pubmed.ncbi.nlm.nih.gov/17108969/)
- [Goldstein AL, et al. "Thymosin beta4: actin-sequestering protein moonlights to repair injured tissues." *Trends Mol Med.* 2005;11(9):421-429.](https://pubmed.ncbi.nlm.nih.gov/16099219/)`,

  'fox04-dri': `## Scientific Background

FOX04-DRI is a **D-retro-inverso peptide** designed to selectively target and eliminate senescent cells by disrupting the p53-FOXO4 protein interaction. It was developed by Dr. Peter de Keizer at Erasmus University Medical Center and published in a landmark 2017 *Cell* paper, establishing a novel senolytic approach.

## Key Research Findings

- **Selective senolytic activity (2017):** The seminal research published in *Cell* demonstrated that FOXO4 accumulates in senescent cells and sequesters p53, preventing it from triggering apoptosis. FOX04-DRI competitively disrupts this interaction, **releasing p53 to selectively induce apoptosis in senescent cells** while leaving healthy cells unaffected. This selectivity distinguishes it from broad-spectrum senolytics.

- **In vivo rejuvenation effects:** In fast-aging (XpdTTD/TTD) and naturally aged mice, FOX04-DRI treatment restored fitness, improved renal function, reversed fur loss, and increased exploration behavior. Treated animals showed significant clearance of p16INK4a+ and p21CIP1+ senescent cells across multiple tissues.

- **D-retro-inverso stability:** The peptide's DRI modification (using D-amino acids in reverse sequence) confers exceptional resistance to proteolytic degradation while maintaining the binding surface topology necessary for FOXO4-p53 disruption. This structural approach extends biological half-life from minutes to hours, enabling practical therapeutic research.

## References

- [Baar MP, et al. "Targeted Apoptosis of Senescent Cells Restores Tissue Homeostasis in Response to Chemotoxicity and Aging." *Cell.* 2017;169(1):132-147.e16.](https://pubmed.ncbi.nlm.nih.gov/28340339/)
- [de Keizer PLJ. "The Fountain of Youth by Targeting Senescent Cells?" *Trends Mol Med.* 2017;23(1):6-17.](https://pubmed.ncbi.nlm.nih.gov/28089204/)`,

  'semaglutide': `## Scientific Background

Semaglutide is a **long-acting GLP-1 receptor agonist** with 94% structural homology to native human GLP-1. Key modifications — an amino acid substitution at position 8 (Aib) and a C-18 fatty diacid chain attached via a linker at position 26 — confer albumin binding that extends its half-life to approximately 7 days, enabling once-weekly administration.

## Key Research Findings

- **STEP clinical program (2021):** The landmark STEP 1 trial published in *The New England Journal of Medicine* demonstrated that subcutaneous semaglutide 2.4mg achieved mean body weight reductions of **14.9%** over 68 weeks, with one-third of participants losing more than 20% of body weight — results that transformed the landscape of obesity research.

- **Cardiovascular benefits:** The SELECT trial (2023) published in *The New England Journal of Medicine* demonstrated that semaglutide reduced the risk of major adverse cardiovascular events (MACE) by **20%** in overweight/obese adults with established cardiovascular disease but without diabetes — establishing cardiovascular benefits independent of glycemic effects.

- **Neuroprotective potential:** Emerging research published in *Nature Medicine* and *Alzheimer's & Dementia* has identified potential neuroprotective effects of GLP-1 receptor agonists including semaglutide. Preclinical studies show reduced neuroinflammation, improved insulin signaling in the brain, and decreased amyloid-beta and tau pathology. Clinical trials investigating cognitive outcomes are underway.

## References

- [Wilding JPH, et al. "Once-Weekly Semaglutide in Adults with Overweight or Obesity." *N Engl J Med.* 2021;384(11):989-1002.](https://pubmed.ncbi.nlm.nih.gov/33567185/)
- [Lincoff AM, et al. "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes." *N Engl J Med.* 2023;389(24):2221-2232.](https://pubmed.ncbi.nlm.nih.gov/37952131/)
- [Nørgaard CH, et al. "Treatment with glucagon-like peptide-1 receptor agonists and incidence of dementia." *Alzheimers Dement.* 2022;8(1):e12268.](https://pubmed.ncbi.nlm.nih.gov/35310527/)`,
}

async function main() {
  console.log('Connecting to Google Sheets...')
  const sheets = await getUncachableGoogleSheetClient()

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Products!A:K',
  })

  const rows = response.data.values || []
  if (rows.length < 2) {
    console.error('No product data found in sheet')
    return
  }

  const headers = rows[0].map((h: string) => h.trim().toLowerCase())
  const slugCol = headers.indexOf('slug')
  const nameCol = headers.indexOf('name')
  const researchCol = headers.indexOf('research')

  if (slugCol === -1 || researchCol === -1) {
    console.error('Could not find slug or research columns')
    console.log('Headers found:', headers)
    return
  }

  console.log(`Found ${rows.length - 1} products. Research column index: ${researchCol}`)
  console.log('---')

  const updates: { range: string; values: string[][] }[] = []
  let skipped = 0

  for (let i = 1; i < rows.length; i++) {
    const slug = (rows[i][slugCol] || '').trim().toLowerCase()
    const name = (rows[i][nameCol] || '').trim()

    if (!slug) continue

    const content = research[slug]

    if (!content) {
      console.log(`⚠ No research report for "${name}" (slug: "${slug}") — skipping`)
      skipped++
      continue
    }

    const colLetter = String.fromCharCode(65 + researchCol)
    const cellRange = `Products!${colLetter}${i + 1}`
    updates.push({
      range: cellRange,
      values: [[content]],
    })
    console.log(`✅ "${name}" — research report ready (${content.length} chars)`)
  }

  if (skipped > 0) {
    console.log(`\n⚠ ${skipped} products had no matching research report`)
  }

  if (updates.length === 0) {
    console.log('\nNo updates to write.')
    return
  }

  console.log(`\nWriting ${updates.length} research reports to Google Sheets...`)

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      valueInputOption: 'RAW',
      data: updates,
    },
  })

  console.log(`✅ Done! Updated ${updates.length} product research reports.`)
}

main().catch(console.error)
