import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { PageHeader } from './PageHeader';

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceTemplateProps {
  title: string;
  icon: LucideIcon;
  description: string;
  whoIsItFor: string[];
  whyItMatters: string[];
  howWeHelp: string[];
  faqs: FAQ[];
}

export function ServiceTemplate({ title, icon: Icon, description, whoIsItFor, whyItMatters, howWeHelp, faqs }: ServiceTemplateProps) {
  return (
    <div>
      <PageHeader
        title={title.split(' ').slice(0, -1).join(' ') || title}
        highlightedText={title.split(' ').slice(-1)[0] || ''}
        subtitle={description}
        icon={<Icon className="w-16 h-16 text-teal-600" />}
      />

      {/* Who Is It For */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8">Who Is This For?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {whoIsItFor.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className="w-2 h-2 bg-[#0d9488] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8">Why It Matters</h2>
            <div className="space-y-4">
              {whyItMatters.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#0d9488]">
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8">How VRK Wealth Helps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {howWeHelp.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="bg-white p-6 rounded-lg shadow-md group">
                  <summary className="font-semibold text-[#1e3a8a] cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-[#0d9488] group-open:rotate-180 transition">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Speak to our advisors to understand how {title} can help you achieve your financial goals
          </p>
          <Link to="/contact" className="inline-block bg-[#d4af37] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#b8941f] transition">
            Speak to an Advisor
          </Link>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-8 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-800 text-center">
              <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing. Past performance is not indicative of future returns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
