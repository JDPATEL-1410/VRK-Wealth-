import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import ScrollToTopButton from './components/ScrollToTopButton';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Calculators } from './pages/Calculators';
import { KnowledgeHub } from './pages/KnowledgeHub';
import { Contact } from './pages/Contact';
import { ClientLogin } from './pages/ClientLogin';
import { Disclaimer } from './pages/Disclaimer';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { RiskDisclosure } from './pages/RiskDisclosure';
import { CommissionDisclosure } from './pages/CommissionDisclosure';
import { KycAml } from './pages/KycAml';

// Service Pages
import { MutualFunds } from './pages/services/MutualFunds';
import { GoalBasedInvesting } from './pages/services/GoalBasedInvesting';
import { StocksEquity } from './pages/services/StocksEquity';
import { FixedDeposits } from './pages/services/FixedDeposits';
import { TaxPlanning } from './pages/services/TaxPlanning';
import { LifeInsurance } from './pages/services/LifeInsurance';
import { HealthInsurance } from './pages/services/HealthInsurance';
import { SpecialisedInvestmentFund } from './pages/services/SpecialisedInvestmentFund';

// Calculator Pages
import { SIPCalculator } from './pages/calculators/SIPCalculator';
import LumpsumCalculator from './pages/calculators/LumpsumCalculator';
import SWPCalculator from './pages/calculators/SWPCalculator';
import { StepUpSIPCalculator } from './pages/calculators/StepUpSIPCalculator';
import { DelayCostCalculator } from './pages/calculators/DelayCostCalculator';
import { RetirementCalculator } from './pages/calculators/RetirementCalculator';
import { EducationCalculator } from './pages/calculators/EducationCalculator';
import { HomeBuyingCalculator } from './pages/calculators/HomeBuyingCalculator';
import { CarPurchaseCalculator } from './pages/calculators/CarPurchaseCalculator';
import { EMICalculator } from './pages/calculators/EMICalculator';
import { FDCalculator } from './pages/calculators/FDCalculator';
import { GoalCalculator } from './pages/calculators/GoalCalculator';
import { STPCalculator } from './pages/calculators/STPCalculator';
import { CompoundingCalculator } from './pages/calculators/CompoundingCalculator';
import { MarriageCalculator } from './pages/calculators/MarriageCalculator';
import { VacationCalculator } from './pages/calculators/VacationCalculator';

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/knowledge-hub" element={<KnowledgeHub />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/client-login" element={<ClientLogin />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/risk-disclosure" element={<RiskDisclosure />} />
            <Route path="/commission-disclosure" element={<CommissionDisclosure />} />
            <Route path="/kyc-aml" element={<KycAml />} />

            {/* Service Pages */}
            <Route path="/services/mutual-funds" element={<MutualFunds />} />
            <Route path="/services/goal-based-investing" element={<GoalBasedInvesting />} />
            <Route path="/services/stocks-equity" element={<StocksEquity />} />
            <Route path="/services/fixed-deposits" element={<FixedDeposits />} />
            <Route path="/services/tax-planning" element={<TaxPlanning />} />
            <Route path="/services/life-insurance" element={<LifeInsurance />} />
            <Route path="/services/health-insurance" element={<HealthInsurance />} />
            <Route path="/services/specialised-investment-fund" element={<SpecialisedInvestmentFund />} />

            {/* Calculator Pages */}
            <Route path="/calculators/sip" element={<SIPCalculator />} />
            <Route path="/calculators/lumpsum" element={<LumpsumCalculator />} />
            <Route path="/calculators/swp" element={<SWPCalculator />} />
            <Route path="/calculators/stepup-sip" element={<StepUpSIPCalculator />} />
            <Route path="/calculators/delay-cost" element={<DelayCostCalculator />} />
            <Route path="/calculators/retirement" element={<RetirementCalculator />} />
            <Route path="/calculators/education" element={<EducationCalculator />} />
            <Route path="/calculators/home" element={<HomeBuyingCalculator />} />
            <Route path="/calculators/car" element={<CarPurchaseCalculator />} />
            <Route path="/calculators/emi" element={<EMICalculator />} />
            <Route path="/calculators/fd" element={<FDCalculator />} />
            <Route path="/calculators/goal" element={<GoalCalculator />} />
            <Route path="/calculators/stp" element={<STPCalculator />} />
            <Route path="/calculators/compounding" element={<CompoundingCalculator />} />
            <Route path="/calculators/marriage" element={<MarriageCalculator />} />
            <Route path="/calculators/vacation" element={<VacationCalculator />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}
