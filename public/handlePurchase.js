export async function handlePurchase(dialog) {
  const goldPriceEl = document.getElementById('price-display')
  const investmentAmount = document.getElementById('investment-amount')

  const investmentValue = parseFloat(investmentAmount.value)
  const pricePerOz = parseFloat(goldPriceEl.textContent)

  const ounces = investmentValue / pricePerOz
  const choppedOunces = Math.trunc(ounces * 10) / 10

  const investmentSummary = document.getElementById('investment-summary')
  investmentSummary.textContent = `You just bought ${choppedOunces.toFixed(1)} ounces (ozt) for £${investmentValue}. \n You will receive documentation shortly.`

  dialog.showModal()

  try {
    const response = await fetch('/log-transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: investmentValue,
        ounces: choppedOunces.toFixed(1),
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    console.log(`Transaction: £${investmentValue} → ${choppedOunces.toFixed(1)} oz @ £${pricePerOz}/oz - ${new Date().toISOString()}`)
  } catch (err) {
    console.error('Log error:', err)
  }
}