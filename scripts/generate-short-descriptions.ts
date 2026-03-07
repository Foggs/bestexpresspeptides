import { getUncachableGoogleSheetClient } from '../src/lib/googleSheets'

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!

const shortDescriptions: Record<string, string> = {
  'retatrutide': 'A first-in-class triple-agonist peptide targeting GLP-1, GIP, and glucagon receptors simultaneously. Studied for its potential in metabolic research and body composition.',
  'tirzepatide': 'A dual GIP/GLP-1 receptor agonist that has demonstrated significant effects in metabolic and weight management research. One of the most extensively studied incretin-based compounds.',
  'mazdutide': 'A dual GLP-1/glucagon receptor agonist combining appetite regulation with enhanced energy expenditure. Actively studied for metabolic and hepatic fat research.',
  'dsip 15': 'A naturally occurring neuropeptide first isolated from rabbit brain tissue, researched for its role in sleep architecture modulation and neuroendocrine regulation.',
  'pt141': 'A synthetic melanocortin receptor agonist derived from Melanotan II. Researched for its central nervous system mechanism of action through hypothalamic melanocortin pathways.',
  'll37': 'The sole human cathelicidin antimicrobial peptide with broad-spectrum activity against bacteria, fungi, and viruses. Studied for immunomodulatory and wound healing properties.',
  'ipamorelin': 'A highly selective pentapeptide growth hormone secretagogue that stimulates GH release without significantly affecting cortisol, prolactin, or other hormones.',
  '4x alpha': 'A multi-peptide research blend combining four complementary growth-promoting peptides targeting synergistic physiological pathways for enhanced research outcomes.',
  '2x alpha cjc/ipa': 'A dual-peptide combination pairing CJC-1295 (GHRH analog) with Ipamorelin (ghrelin mimetic) to achieve synergistic growth hormone release through complementary receptor systems.',
  'thymosin alpha 1': 'A 28-amino acid immunomodulatory peptide naturally produced by the thymus gland. Extensively researched for T-cell maturation, dendritic cell activation, and immune regulation.',
  'ghk-cu': 'A naturally occurring tripeptide-copper complex that modulates the expression of over 4,000 human genes. Researched for tissue regeneration, wound healing, and antioxidant activity.',
  'epithalon': 'A synthetic tetrapeptide based on the pineal gland peptide Epithalamin. Studied for its effects on telomerase activation, melatonin regulation, and aging biomarkers.',
  'pinealon': 'A synthetic tripeptide bioregulator that crosses the blood-brain barrier. Researched for neuroprotective effects against oxidative stress and beta-amyloid toxicity in neuronal models.',
  'ss31': 'A mitochondria-targeted tetrapeptide that selectively binds cardiolipin in the inner mitochondrial membrane. Studied for mitochondrial bioenergetics and cardioprotection research.',
  'nad': 'An essential coenzyme involved in over 500 enzymatic reactions, serving as a substrate for sirtuins and PARPs. Central to aging, DNA repair, and metabolic function research.',
  'glutathione': 'The most abundant intracellular antioxidant and master regulator of cellular redox homeostasis. Essential for immune function, detoxification, and oxidative stress protection.',
  'cartalax': 'A synthetic tripeptide bioregulator designed to target cartilage tissue. Researched for its effects on chondrocyte viability and cartilage extracellular matrix gene expression.',
  'tb500': 'A synthetic fragment of Thymosin Beta-4, one of the most abundant intracellular proteins. Researched for cell migration, tissue repair, and anti-inflammatory properties via actin regulation.',
  'thymalin': 'A bioregulatory peptide complex extracted from thymus tissue, studied for over four decades. Researched for immune restoration, T-cell normalization, and neuroendocrine-immune interactions.',
  'mots-c': 'A mitochondrial-derived peptide that activates the AMPK signaling pathway. Studied as a potential exercise mimetic with effects on glucose metabolism and insulin sensitivity.',
  'b12': 'An essential cobalt-containing vitamin required for neurological function, DNA synthesis, and methylation reactions. Critical for homocysteine metabolism and mitochondrial energy production.',
  'bpc 157': 'A 15-amino acid peptide derived from human gastric juice with over 100 published preclinical studies. Researched for cytoprotective, regenerative, and NO system-modulating properties.',
  'bpc 157 10mg/tb500 10 mg wolverine': 'A high-dose combination of BPC-157 and TB-500 targeting complementary tissue repair pathways. Researched for synergistic regenerative and anti-inflammatory effects.',
  'fox04-dri': 'A D-retro-inverso peptide designed to selectively target senescent cells by disrupting the p53-FOXO4 interaction. A novel senolytic compound studied for aging and tissue homeostasis research.',
  'semaglutide': 'A long-acting GLP-1 receptor agonist with a 7-day half-life. One of the most studied peptides in metabolic, cardiovascular, and neuroprotection research.',
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
  const shortDescCol = headers.indexOf('shortdescription')

  if (slugCol === -1 || shortDescCol === -1) {
    console.error('Could not find slug or shortDescription columns')
    console.log('Headers found:', headers)
    return
  }

  console.log(`Found ${rows.length - 1} products. shortDescription column index: ${shortDescCol}`)
  console.log('---')

  const updates: { range: string; values: string[][] }[] = []
  let skipped = 0

  for (let i = 1; i < rows.length; i++) {
    const slug = (rows[i][slugCol] || '').trim().toLowerCase()
    const name = (rows[i][nameCol] || '').trim()

    if (!slug) continue

    const content = shortDescriptions[slug]

    if (!content) {
      console.log(`⚠ No short description for "${name}" (slug: "${slug}") — skipping`)
      skipped++
      continue
    }

    const colLetter = String.fromCharCode(65 + shortDescCol)
    const cellRange = `Products!${colLetter}${i + 1}`
    updates.push({
      range: cellRange,
      values: [[content]],
    })
    console.log(`✅ "${name}" — short description ready (${content.length} chars)`)
  }

  if (skipped > 0) {
    console.log(`\n⚠ ${skipped} products had no matching short description`)
  }

  if (updates.length === 0) {
    console.log('\nNo updates to write.')
    return
  }

  console.log(`\nWriting ${updates.length} short descriptions to Google Sheets...`)

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      valueInputOption: 'RAW',
      data: updates,
    },
  })

  console.log(`✅ Done! Updated ${updates.length} product short descriptions.`)
}

main().catch(console.error)
