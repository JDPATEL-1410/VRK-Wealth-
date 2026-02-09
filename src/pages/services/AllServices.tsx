import { ServiceTemplate } from '@/components/ServiceTemplate';
import { PiggyBank, Target, TrendingUp, Wallet, Calculator, Shield, Heart, Briefcase } from 'lucide-react';

export function MutualFunds() {
  return (
    <ServiceTemplate
      title="Mutual Funds"
      icon={PiggyBank}
      description="Professionally managed diversified investment portfolios to help you achieve your financial goals"
      whoIsItFor={[
        "First-time investors looking for professional fund management",
        "Salaried professionals wanting to build wealth systematically",
        "Business owners seeking diversified investment options",
        "Investors looking for tax-saving investments (ELSS)",
        "Retirees seeking regular income through dividend or SWP",
        "NRIs wanting to invest in Indian markets"
      ]}
      whyItMatters={[
        "Professional Management: Expert fund managers research and manage your investments, saving you time and effort.",
        "Diversification: Spread risk across multiple securities, reducing impact of individual stock performance.",
        "Affordability: Start investing with as little as ₹500 through SIP, making wealth creation accessible to all.",
        "Liquidity: Most mutual funds (except ELSS during lock-in) can be redeemed quickly when you need money.",
        "Tax Efficiency: ELSS offers tax deduction under Section 80C. Long-term equity gains taxed favorably.",
        "Transparency: Regular NAV updates, portfolio disclosures, and performance tracking."
      ]}
      howWeHelp={[
        "Goal-based fund selection aligned with your financial objectives and risk profile",
        "Comprehensive research on fund performance, fund manager track record, and expense ratios",
        "SIP planning and automation for disciplined wealth creation",
        "Portfolio diversification across equity, debt, and hybrid categories",
        "Regular portfolio review and rebalancing recommendations",
        "Hassle-free transaction processing and documentation support",
        "Tax-efficient investment strategies including ELSS recommendations",
        "Ongoing market updates and fund performance monitoring"
      ]}
      faqs={[
        {
          question: "What is the minimum amount to invest in mutual funds?",
          answer: "You can start a SIP with as little as ₹500 per month in most schemes. For lumpsum investments, the minimum is typically ₹5,000 depending on the scheme."
        },
        {
          question: "What is the difference between Regular and Direct plans?",
          answer: "Regular plans are distributed through intermediaries like VRK Wealth and include distributor commissions in the expense ratio. Direct plans have lower expense ratios as they don't include distributor fees. We offer Regular plans with comprehensive advisory and support services."
        },
        {
          question: "How long should I stay invested?",
          answer: "For equity funds, we recommend a minimum 5-7 year horizon to ride out market volatility. For debt funds, 1-3 years is typically sufficient. Investment duration should align with your financial goals."
        },
        {
          question: "Can I withdraw my money anytime?",
          answer: "Yes, most mutual funds (except ELSS which has a 3-year lock-in) offer high liquidity. You can redeem your units anytime, though we recommend staying invested for your goal tenure."
        },
        {
          question: "What are the tax implications?",
          answer: "Equity funds: Long-term gains (>1 year) above ₹1 lakh taxed at 10%. Short-term gains taxed at 15%. Debt funds: Gains taxed as per your income tax slab. ELSS offers tax deduction under Section 80C."
        }
      ]}
    />
  );
}

export function GoalBasedInvesting() {
  return (
    <ServiceTemplate
      title="Goal-Based Investing"
      icon={Target}
      description="Customized investment strategies designed to help you achieve specific life goals with clarity and confidence"
      whoIsItFor={[
        "Parents planning for children's higher education expenses",
        "Young professionals saving for marriage or home down payment",
        "Couples planning their dream home purchase",
        "Working professionals building retirement corpus",
        "Entrepreneurs creating emergency funds or business capital",
        "Anyone with specific financial milestones to achieve"
      ]}
      whyItMatters={[
        "Clarity: Clear target amount and timeline makes investing purposeful and focused.",
        "Discipline: Goal-linked investments create commitment and reduce premature withdrawals.",
        "Right Product Mix: Each goal gets appropriate asset allocation based on time horizon and risk.",
        "Progress Tracking: Regular monitoring shows you exactly where you stand versus your target.",
        "Better Outcomes: Goal-based approach historically delivers better results than random investing.",
        "Peace of Mind: Knowing your goals are funded reduces financial anxiety and stress."
      ]}
      howWeHelp={[
        "Detailed goal discovery session to understand your aspirations and priorities",
        "Inflation-adjusted goal amount calculation for realistic planning",
        "Time horizon analysis and risk profiling for each specific goal",
        "Customized asset allocation strategy for each goal (equity, debt, hybrid mix)",
        "Product selection aligned with goal tenure and risk parameters",
        "SIP and lumpsum investment combination for optimal wealth accumulation",
        "Quarterly review to track progress and make necessary adjustments",
        "Rebalancing guidance as you approach your goal date"
      ]}
      faqs={[
        {
          question: "How many goals can I plan for simultaneously?",
          answer: "You can plan for multiple goals simultaneously. We typically help clients manage 3-5 goals at once including education, retirement, home purchase, etc. Each goal gets its own strategy."
        },
        {
          question: "What if my goal date changes?",
          answer: "We can adjust your investment strategy if your goal timeline changes. Extending the timeline may allow more aggressive allocation, while shortening it may require increased contributions or conservative approach."
        },
        {
          question: "How much should I invest for my child's education?",
          answer: "This depends on the target amount and timeline. For example, if you need ₹50 lakhs in 15 years, you might need to invest ₹12,000-15,000 monthly assuming 12% returns. We help calculate the exact amount needed."
        },
        {
          question: "What if I can't reach my goal on time?",
          answer: "If we identify a shortfall during reviews, we discuss options: increasing monthly investment, extending timeline, adjusting goal amount, or optimizing asset allocation for better returns."
        },
        {
          question: "Can I withdraw from one goal for another?",
          answer: "While possible, we generally advise against it as it disrupts your planning. Instead, we help you prioritize goals and create a backup emergency fund to avoid such situations."
        }
      ]}
    />
  );
}

export function StocksEquity() {
  return (
    <ServiceTemplate
      title="Stocks & Equity Guidance"
      icon={TrendingUp}
      description="Research-driven stock recommendations and equity portfolio management guidance for informed investing"
      whoIsItFor={[
        "Experienced investors wanting to build direct equity portfolios",
        "Business owners with understanding of markets and higher risk appetite",
        "HNI investors seeking concentrated equity positions",
        "Investors with time to track markets and understand businesses",
        "Those seeking higher returns through individual stock selection",
        "Investors comfortable with volatility and active portfolio management"
      ]}
      whyItMatters={[
        "Higher Return Potential: Quality stocks can deliver superior returns compared to diversified funds over long term.",
        "Ownership: Direct ownership in companies you believe in and understand.",
        "Control: Full control over entry, exit, and position sizing decisions.",
        "Dividend Income: Regular income through dividend-paying stocks.",
        "Lower Costs: No fund management fees, though requires your time and effort.",
        "Tax Efficiency: Long-term equity gains above ₹1 lakh taxed at only 10%."
      ]}
      howWeHelp={[
        "Fundamental research and company analysis for stock selection",
        "Sector allocation guidance based on economic cycles and market conditions",
        "Entry and exit price recommendations based on valuations",
        "Portfolio construction with appropriate diversification",
        "Risk management through position sizing and stop loss levels",
        "Regular research reports and market commentary",
        "Corporate action guidance (bonus, splits, rights, dividends)",
        "Tax planning for equity investments and harvest ing strategies"
      ]}
      faqs={[
        {
          question: "How is stock investing different from mutual funds?",
          answer: "Stocks require active management, research, and monitoring. Mutual funds offer professional management and instant diversification. Stocks can deliver higher returns but carry higher risk and require more time commitment."
        },
        {
          question: "How many stocks should I have in my portfolio?",
          answer: "For adequate diversification, we typically recommend 12-20 stocks across different sectors. Too few increases risk, too many becomes difficult to track effectively."
        },
        {
          question: "Should I invest lumpsum or SIP in stocks?",
          answer: "Both have merits. SIP reduces timing risk and averages your cost. Lumpsum can be deployed during market corrections. We often recommend a combination based on market conditions."
        },
        {
          question: "What is your success rate in stock recommendations?",
          answer: "We focus on process, not predictions. Our recommendations are based on thorough research, but markets are unpredictable. Past performance does not guarantee future results. We aim for 60-70% accuracy over time."
        },
        {
          question: "Do you provide intraday trading tips?",
          answer: "No, we focus on long-term wealth creation through fundamentally strong companies. We do not provide intraday or short-term trading recommendations."
        }
      ]}
    />
  );
}

export function FixedDeposits() {
  return (
    <ServiceTemplate
      title="Fixed Deposits"
      icon={Wallet}
      description="Safe and stable fixed deposit options from leading banks and NBFCs with competitive interest rates"
      whoIsItFor={[
        "Conservative investors prioritizing capital safety over high returns",
        "Senior citizens seeking regular guaranteed income",
        "Those parking emergency funds or short-term savings",
        "Risk-averse investors uncomfortable with market volatility",
        "Investors seeking tax-saving FDs under Section 80C",
        "Those with specific near-term goals requiring capital guarantee"
      ]}
      whyItMatters={[
        "Capital Safety: Principal amount is guaranteed (up to ₹5 lakhs per bank insured by DICGC).",
        "Predictable Returns: Know exactly how much you'll earn at maturity.",
        "Regular Income: Option for monthly/quarterly interest payouts for income needs.",
        "No Market Risk: Returns unaffected by stock market volatility or economic changes.",
        "Liquidity: Premature withdrawal allowed with penalty in emergency situations.",
        "Tax Benefits: Tax-saving FDs offer deduction under Section 80C."
      ]}
      howWeHelp={[
        "Interest rate comparison across banks and NBFCs to maximize returns",
        "Credit rating analysis of NBFCs for safety assessment",
        "Ladder strategy to balance liquidity and returns",
        "Tax-saving FD recommendations under Section 80C",
        "Senior citizen special rate identification for higher returns",
        "Documentation and account opening support",
        "Maturity tracking and reinvestment planning",
        "Combination with other debt products for optimal portfolio"
      ]}
      faqs={[
        {
          question: "Are FDs completely safe?",
          answer: "Bank FDs up to ₹5 lakhs per bank are insured by DICGC. For NBFCs, check credit ratings (AAA/AA rated are safer). Diversify across banks if investing large amounts."
        },
        {
          question: "What is the difference between bank and NBFC FDs?",
          answer: "NBFC FDs typically offer 0.5-1.5% higher interest but carry slightly higher risk. Bank FDs are DICGC insured. We recommend AAA-rated NBFCs for safety."
        },
        {
          question: "Can I break my FD before maturity?",
          answer: "Yes, most FDs allow premature withdrawal with a penalty of 0.5-1% on the interest rate. Some banks charge additional fees. Tax-saving FDs have mandatory 5-year lock-in."
        },
        {
          question: "Should I choose monthly interest or cumulative FD?",
          answer: "Choose monthly/quarterly interest if you need regular income. Choose cumulative if you don't need immediate income, as it maximizes compounding benefit."
        },
        {
          question: "What returns can I expect from FDs?",
          answer: "Current FD rates range from 6-8% per annum depending on tenure and institution. Senior citizens get an additional 0.5% in most banks. Rates fluctuate with RBI policy."
        }
      ]}
    />
  );
}

export function TaxPlanning() {
  return (
    <ServiceTemplate
      title="Tax Planning"
      icon={Calculator}
      description="Strategic tax-saving investment solutions to minimize your tax liability while building wealth"
      whoIsItFor={[
        "Salaried individuals in higher tax brackets seeking to reduce tax burden",
        "Business owners looking for tax-efficient investment options",
        "Professionals wanting to optimize deductions under various sections",
        "Parents seeking tax benefits on children's education fees",
        "Home loan borrowers maximizing Section 80C and 24(b) benefits",
        "Anyone paying significant income tax and wanting legal tax savings"
      ]}
      whyItMatters={[
        "Wealth Preservation: Every rupee saved in tax is a rupee earned for your goals.",
        "Legal Compliance: Proper planning ensures all benefits are claimed within legal framework.",
        "Dual Benefit: Tax-saving investments also build long-term wealth.",
        "Significant Savings: Can save up to ₹50,000+ annually in tax through Section 80C alone.",
        "Better Returns: Tax-free or tax-efficient investments provide higher post-tax returns.",
        "Financial Discipline: Tax planning encourages systematic investing and savings habit."
      ]}
      howWeHelp={[
        "Comprehensive tax liability assessment and optimization strategies",
        "Section 80C investment planning (ELSS, PPF, EPF, life insurance)",
        "Section 80D health insurance premium optimization",
        "NPS recommendations for additional ₹50,000 deduction under 80CCD(1B)",
        "Home loan interest and principal claim maximization",
        "Education loan interest deduction guidance under Section 80E",
        "Tax-efficient withdrawal strategies to minimize TDS and capital gains",
        "Year-end tax planning and proactive saving declarations"
      ]}
      faqs={[
        {
          question: "How much tax can I save through investments?",
          answer: "Under Section 80C, you can claim up to ₹1.5 lakh deduction. Additional ₹50,000 under 80CCD(1B) for NPS, ₹25,000 under 80D for health insurance. Total potential savings: ₹50,000-75,000+ depending on tax bracket."
        },
        {
          question: "Which is better for tax saving: ELSS, PPF, or insurance?",
          answer: "ELSS offers highest return potential but has market risk. PPF provides guaranteed (but lower) returns with EEE benefit. Term insurance offers pure protection. We recommend a combination based on your needs and goals."
        },
        {
          question: "What is the lock-in period for tax-saving investments?",
          answer: "ELSS: 3 years (shortest), PPF: 15 years (partial withdrawal after 7 years), Tax-saving FD: 5 years, NPS: Till retirement (with partial withdrawal allowed), Life Insurance: Policy term."
        },
        {
          question: "Can I claim deductions for my parents' health insurance?",
          answer: "Yes, under Section 80D you can claim up to ₹25,000 (₹50,000 if parents are senior citizens) for health insurance premiums paid for parents, in addition to your own insurance."
        },
        {
          question: "Is tax planning only for high-income individuals?",
          answer: "No, even those earning ₹5-7 lakhs annually can benefit significantly. Tax planning is for anyone paying income tax who wants to legally minimize their liability while building wealth."
        }
      ]}
    />
  );
}

export function LifeInsurance() {
  return (
    <ServiceTemplate
      title="Life Insurance"
      icon={Shield}
      description="Comprehensive life insurance coverage to protect your family's financial future and achieve goals even in your absence"
      whoIsItFor={[
        "Earning members with financial dependents (spouse, children, parents)",
        "Young professionals starting their career and family",
        "Self-employed individuals without employer group insurance",
        "Home loan borrowers wanting to protect family from debt burden",
        "Parents ensuring children's education funding regardless of circumstances",
        "High net-worth individuals seeking estate planning solutions"
      ]}
      whyItMatters={[
        "Family Protection: Ensures your family maintains lifestyle even if something happens to you.",
        "Debt Coverage: Life cover can repay outstanding loans protecting family from burden.",
        "Goal Funding: Ensures children's education and family goals are not compromised.",
        "Income Replacement: Provides regular income to replace lost earnings.",
        "Peace of Mind: Knowing your family is financially secure brings immense relief.",
        "Affordable: Term insurance offers high coverage at very low premiums, especially when young."
      ]}
      howWeHelp={[
        "Life insurance need assessment based on Human Life Value method",
        "Coverage amount calculation considering goals, debts, and lifestyle",
        "Product comparison: Term vs Endowment vs ULIP vs Money-back",
        "Rider recommendations (critical illness, accidental death, waiver of premium)",
        "Premium optimization to get maximum cover at best price",
        "Claim settlement ratio analysis for reliable insurer selection",
        "Policy documentation and medical test coordination",
        "Claim assistance support for beneficiaries when needed"
      ]}
      faqs={[
        {
          question: "How much life insurance cover do I need?",
          answer: "A general rule is 10-15 times your annual income. We calculate precisely based on your family's expenses, existing debts, future goals (children's education, retirement), and existing savings."
        },
        {
          question: "What is the difference between term insurance and traditional policies?",
          answer: "Term insurance provides pure protection at lowest cost with no maturity benefit. Traditional plans (endowment, money-back) combine insurance with savings but offer lower returns and higher premiums. We primarily recommend term plans for protection."
        },
        {
          question: "Should I buy term insurance or ULIP?",
          answer: "For pure protection, term insurance is most cost-effective. ULIPs combine insurance with investment but offer lower cover and higher charges. We generally recommend separating insurance and investment."
        },
        {
          question: "At what age should I buy life insurance?",
          answer: "As soon as you have financial dependents. Younger age means lower premiums and easier medical approval. A 25-year-old pays significantly less than a 35-year-old for same cover."
        },
        {
          question: "What happens if I stop paying premiums?",
          answer: "For term plans, coverage stops if premiums are not paid within grace period. For traditional plans, policy may become paid-up with reduced benefits. Always maintain policies active for full protection."
        }
      ]}
    />
  );
}

export function HealthInsurance() {
  return (
    <ServiceTemplate
      title="Health & General Insurance"
      icon={Heart}
      description="Comprehensive health insurance plans to protect you from rising medical costs and unexpected health emergencies"
      whoIsItFor={[
        "Individuals and families without adequate employer health coverage",
        "Self-employed professionals and business owners",
        "Senior citizens needing specialized health coverage",
        "Young professionals wanting to secure low premiums early",
        "Those with pre-existing conditions seeking comprehensive coverage",
        "Anyone wanting financial protection against medical emergencies"
      ]}
      whyItMatters={[
        "Medical Cost Protection: Healthcare costs rising at 10-15% annually. Insurance prevents financial drain.",
        "Quality Treatment: Adequate cover ensures you get best treatment without compromising on cost.",
        "Tax Benefits: Premium paid qualifies for deduction under Section 80D.",
        "Cashless Treatment: Network hospitals provide treatment without upfront payment.",
        "Family Coverage: Single policy can cover entire family at affordable cost.",
        "Peace of Mind: Focus on recovery, not bills, during medical emergencies."
      ]}
      howWeHelp={[
        "Coverage amount recommendation based on family size and location",
        "Policy comparison across insurers for best features and pricing",
        "Family floater vs individual policy analysis",
        "Top-up and super top-up strategies for cost-effective higher coverage",
        "Pre-existing disease coverage and waiting period guidance",
        "Room rent, co-payment, and sub-limit optimization",
        "Claim settlement process support and documentation",
        "Annual renewal management and policy portability guidance"
      ]}
      faqs={[
        {
          question: "What is the ideal health insurance cover amount?",
          answer: "Minimum ₹5 lakhs for tier-2 cities, ₹10 lakhs+ for metros. For families, ₹10-25 lakhs recommended. Consider increasing cover as you age or if you have senior citizen dependents."
        },
        {
          question: "Should I buy individual policies or family floater?",
          answer: "Family floater is cost-effective if all members are relatively young and healthy. Individual policies provide dedicated sum assured and better as family ages. We often recommend combination."
        },
        {
          question: "Will my pre-existing diseases be covered?",
          answer: "Most policies cover pre-existing diseases after 2-4 years waiting period. Some insurers offer shorter waiting periods or immediate coverage at higher premium. Disclosure is mandatory."
        },
        {
          question: "What is the difference between base policy and top-up?",
          answer: "Base policy covers from first rupee. Top-up activates after deductible (e.g., after ₹5 lakhs). Super top-up is more flexible and cost-effective for adding higher coverage."
        },
        {
          question: "My employer provides health insurance. Do I still need my own?",
          answer: "Yes! Employer coverage ends when you leave job, usually inadequate for family, and no coverage during job transitions. Personal policy ensures lifelong coverage with continuity benefits."
        }
      ]}
    />
  );
}

export function SpecialisedInvestmentFund() {
  return (
    <ServiceTemplate
      title="Specialised Investment Funds (SIF)"
      icon={Briefcase}
      description="Alternative investment opportunities for qualified investors seeking portfolio diversification beyond traditional assets"
      whoIsItFor={[
        "High Net Worth Individuals (HNI) with investment capacity above ₹1 crore",
        "Qualified Institutional Buyers seeking specialized exposure",
        "Experienced investors comfortable with longer lock-in periods",
        "Those seeking alternative assets (private equity, real estate, debt)",
        "Investors wanting professional management of specialized strategies",
        "Those with well-diversified traditional portfolios seeking further diversification"
      ]}
      whyItMatters={[
        "Higher Return Potential: Alternative assets can deliver superior risk-adjusted returns.",
        "Portfolio Diversification: Low correlation with traditional assets reduces overall portfolio risk.",
        "Professional Management: Access to expert fund managers and specialized investment strategies.",
        "Exclusive Access: Investments in private companies, real estate, and structured products.",
        "Customization: Tailored strategies aligned with specific investor requirements.",
        "Tax Efficiency: Structured for optimal tax treatment in many cases."
      ]}
      howWeHelp={[
        "Investor eligibility assessment and documentation support",
        "SIF category selection (Cat I, II, III) based on objectives and risk appetite",
        "Fund manager evaluation and track record analysis",
        "Strategy assessment: PE, VC, real estate, debt, multi-strategy",
        "Fee structure analysis (management fees, performance fees, carry)",
        "Liquidity and lock-in period understanding",
        "Regulatory compliance and documentation guidance",
        "Portfolio allocation strategy for alternatives within overall wealth"
      ]}
      faqs={[
        {
          question: "What is the minimum investment for SIF?",
          answer: "Category I and II: Minimum ₹1 crore per investor. Category III: Minimum ₹1 crore. These are regulatory minimums and may be higher for specific funds."
        },
        {
          question: "How are SIFs different from mutual funds?",
          answer: "SIFs are lightly regulated, meant for sophisticated investors, have higher minimums, longer lock-ins, and invest in alternative assets. Mutual funds are heavily regulated, retail-focused, highly liquid."
        },
        {
          question: "What is the typical lock-in period?",
          answer: "Usually 3-7 years depending on strategy. Private equity funds may have longer horizons. Some funds offer quarterly redemption windows after initial lock-in period."
        },
        {
          question: "What returns can I expect from SIFs?",
          answer: "Target returns vary: 12-15% for debt-oriented, 15-20% for balanced, 20%+ for equity/PE funds. Returns are less predictable than traditional assets. Past performance does not guarantee future results."
        },
        {
          question: "Are SIFs risky?",
          answer: "SIFs generally carry higher risk than mutual funds due to illiquid assets, concentrated positions, and use of leverage. Suitable only for investors who understand and can afford these risks."
        }
      ]}
    />
  );
}
