import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с Автокорр — телефон, email и форма заявки на подбор автомобиля.",
};

export default function ContactsPage() {
  return (
    <section className="section content-page">
      <h1 className="page-title">Контакты</h1>
      <div className="lead-wrap">
        <div className="contacts-info">
          <div className="contact-row">
            <span className="k">Телефон</span>
            <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>
          </div>
          <div className="contact-row">
            <span className="k">E-mail</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="contact-row">
            <span className="k">Город</span>
            <span>{site.city}</span>
          </div>
          <div className="contact-row">
            <span className="k">Режим</span>
            <span>Ежедневно, 9:00–21:00</span>
          </div>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
