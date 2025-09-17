import { BRAND } from "../lib/brand";
import { formatPhone } from "../lib/phone";

export default function MobileCall() {
  return (
    <a href={BRAND.phoneHref} className="mobile-call" aria-label={`Call ${BRAND.name}`}>
      Call {formatPhone(BRAND.phone)}
    </a>
  );
}
