import { getUncachableGoogleSheetClient } from '../src/lib/googleSheets'

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!

const categories: Record<string, string> = {
  'retatrutide': 'Metabolic, Weight Management, GLP-1 Agonists',
  'tirzepatide': 'Metabolic, Weight Management, GLP-1 Agonists',
  'mazdutide': 'Metabolic, Weight Management, GLP-1 Agonists',
  'dsip 15': 'Neuroprotection, Sleep & Recovery',
  'pt141': 'Sexual Health, Melanocortin',
  'll37': 'Immune Support, Antimicrobial, Tissue Repair',
  'ipamorelin': 'Growth Hormone, Muscle & Recovery',
  '4x alpha': 'Growth Hormone, Muscle & Recovery, Peptide Blends',
  '2x alpha cjc/ipa': 'Growth Hormone, Muscle & Recovery, Peptide Blends',
  'thymosin alpha 1': 'Immune Support, Anti-Aging',
  'ghk-cu': 'Tissue Repair, Anti-Aging, Antioxidant',
  'epithalon': 'Anti-Aging, Telomere Support, Neuroprotection',
  'pinealon': 'Neuroprotection, Anti-Aging',
  'ss31': 'Mitochondrial, Anti-Aging, Cardioprotection',
  'nad': 'Mitochondrial, Anti-Aging, Metabolic',
  'glutathione': 'Antioxidant, Immune Support, Detoxification',
  'cartalax': 'Tissue Repair, Anti-Aging, Joint Support',
  'tb500': 'Tissue Repair, Muscle & Recovery, Anti-Inflammatory',
  'thymalin': 'Immune Support, Anti-Aging',
  'mots-c': 'Mitochondrial, Metabolic, Muscle & Recovery',
  'b12': 'Metabolic, Neuroprotection, Vitamins',
  'bpc 157': 'Tissue Repair, Gastrointestinal, Anti-Inflammatory',
  'bpc 157 10mg/tb500 10 mg wolverine': 'Tissue Repair, Muscle & Recovery, Peptide Blends, Anti-Inflammatory',
  'fox04-dri': 'Senolytic, Anti-Aging',
  'semaglutide': 'Metabolic, Weight Management, GLP-1 Agonists, Cardioprotection',
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
  const categoryCol = headers.indexOf('category')

  if (slugCol === -1 || categoryCol === -1) {
    console.error('Could not find slug or category columns')
    console.log('Headers found:', headers)
    return
  }

  console.log(`Found ${rows.length - 1} products. Category column index: ${categoryCol}`)
  console.log('---')

  const updates: { range: string; values: string[][] }[] = []
  let skipped = 0

  for (let i = 1; i < rows.length; i++) {
    const slug = (rows[i][slugCol] || '').trim().toLowerCase()
    const name = (rows[i][nameCol] || '').trim()

    if (!slug) continue

    const content = categories[slug]

    if (!content) {
      console.log(`⚠ No categories for "${name}" (slug: "${slug}") — skipping`)
      skipped++
      continue
    }

    const colLetter = String.fromCharCode(65 + categoryCol)
    const cellRange = `Products!${colLetter}${i + 1}`
    updates.push({
      range: cellRange,
      values: [[content]],
    })
    console.log(`✅ "${name}" — categories: ${content}`)
  }

  if (skipped > 0) {
    console.log(`\n⚠ ${skipped} products had no matching categories`)
  }

  if (updates.length === 0) {
    console.log('\nNo updates to write.')
    return
  }

  console.log(`\nWriting ${updates.length} category entries to Google Sheets...`)

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    requestBody: {
      valueInputOption: 'RAW',
      data: updates,
    },
  })

  console.log(`✅ Done! Updated ${updates.length} product categories.`)
}

main().catch(console.error)
