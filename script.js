const yearEl = document.getElementById("year");
const selectedProductEl = document.getElementById("selected-product");
const summaryProductEl = document.getElementById("summary-product");
const summaryAmountEl = document.getElementById("summary-amount");
const orderProductInput = document.getElementById("order-product-input");
const orderAmountInput = document.getElementById("order-amount-input");
const orderButtons = document.querySelectorAll(".order-btn");
const copyNumberBtn = document.getElementById("copy-number-btn");
const bkashNumberEl = document.getElementById("bkash-number");
const paymentProofForm = document.getElementById("payment-proof-form");
const formStatusEl = document.getElementById("form-status");
const customerNameEl = document.getElementById("customer-name");
const customerPhoneEl = document.getElementById("customer-phone");
const customerAddressEl = document.getElementById("customer-address");
const customerNoteEl = document.getElementById("customer-note");
const payerNumberEl = document.getElementById("payer-number");
const transactionIdEl = document.getElementById("transaction-id");

yearEl.textContent = new Date().getFullYear();

const bkashNumber = bkashNumberEl.textContent.trim();

const setSelectedProduct = (product, price) => {
  const formattedPrice = Number(price).toLocaleString("en-US");

  summaryProductEl.textContent = product;
  summaryAmountEl.textContent = `৳${formattedPrice}`;
  orderProductInput.value = product;
  orderAmountInput.value = `৳${formattedPrice}`;
  selectedProductEl.textContent = `${product} নির্বাচন করা হয়েছে। এখন bKash নম্বর ${bkashNumber}-এ ৳${formattedPrice} Send Money করে Transaction ID সহ WhatsApp, Call অথবা Email এ যোগাযোগ করুন।`;
  window.location.hash = "payment";
};

orderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSelectedProduct(button.dataset.product, button.dataset.price);
  });
});

copyNumberBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(bkashNumber);
    copyNumberBtn.textContent = "কপি হয়েছে";

    setTimeout(() => {
      copyNumberBtn.textContent = "নম্বর কপি";
    }, 1800);
  } catch (error) {
    selectedProductEl.textContent = `নম্বর কপি করা যায়নি। অনুগ্রহ করে ম্যানুয়ালি কপি করুন: ${bkashNumber}`;
  }
});

paymentProofForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedProduct = orderProductInput.value.trim();
  const selectedAmount = orderAmountInput.value.trim();
  const customerName = customerNameEl.value.trim();
  const customerPhone = customerPhoneEl.value.trim();
  const customerAddress = customerAddressEl.value.trim();
  const customerNote = customerNoteEl.value.trim();
  const payerNumber = payerNumberEl.value.trim();
  const transactionId = transactionIdEl.value.trim();

  if (!selectedProduct || !selectedAmount || selectedAmount === "৳0") {
    formStatusEl.textContent = "সবার আগে একটি প্রোডাক্ট সিলেক্ট করুন, তারপর payment details জমা দিন।";
    window.location.hash = "products";
    return;
  }

  const noteLine = customerNote ? `নোট: ${customerNote}` : "নোট: নেই";
  const message = [
    "নতুন অর্ডার",
    `কাস্টমারের নাম: ${customerName}`,
    `মোবাইল নম্বর: ${customerPhone}`,
    `ঠিকানা: ${customerAddress}`,
    `পণ্য: ${selectedProduct}`,
    `এমাউন্ট: ${selectedAmount}`,
    `যে নম্বর থেকে পেমেন্ট: ${payerNumber}`,
    `Transaction ID: ${transactionId}`,
    noteLine
  ].join("\n");

  const whatsappUrl = `https://wa.me/8801312346017?text=${encodeURIComponent(message)}`;

  formStatusEl.textContent = `${customerName} এর অর্ডার মেসেজ তৈরি হয়েছে। এখন WhatsApp খুলে আপনার নম্বরে পুরো order details পাঠানো হবে।`;
  selectedProductEl.textContent = `অর্ডার প্রস্তুত। ${customerPhone} নম্বরের customer-এর তথ্য WhatsApp message-এ পাঠানো হচ্ছে।`;
  window.open(whatsappUrl, "_blank", "noopener");
});
