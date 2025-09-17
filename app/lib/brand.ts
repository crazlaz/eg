export const BRAND = {
  name: "EG ELECTRIC",
  phone: "704-774-2083",
  phoneHref: "tel:+17047742083",
  city: "Charlotte, NC",
  license: "License #EL-123456",
  emailHref: "mailto:egelectricllc@outlook.com",
  get phonePretty() {
    const d = this.phone.replace(/\D/g, "");
    return d.length === 10 ? `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}` : this.phone;
  },
};
