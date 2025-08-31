import { connectionStatus } from './connection-status.js'
import { generatePrice, updatePrice } from './gold-price.js'
import { handlePurchase } from './handlePurchase.js'

connectionStatus()
generatePrice()
updatePrice()

const dialog = document.querySelector('dialog.outputs')

const form = document.querySelector('form')
if(form) {
  form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    await handlePurchase(dialog)
  })
}

const closeBtn = document.getElementById('close-btn')
closeBtn.addEventListener('click', ()=>{
  dialog.close()
})