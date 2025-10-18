export const BRAND = {
  name: "EG ELECTRIC",
  phone: "980-313-6730",
  phoneHref: "tel:+19803136730",
  email: "egelectricllc@outlook.com",
  emailHref: "mailto:egelectricllc@outlook.com",
  city: "The Carolinas",
  license: "Licensed & Insured",

  get phonePretty() {
    const d = this.phone.replace(/\D/g, "");
    return d.length === 10
      ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
      : this.phone;
  },

  get shortCity() {
    return this.city.split(",")[0]; // e.g. "Charlotte"
  },
};
