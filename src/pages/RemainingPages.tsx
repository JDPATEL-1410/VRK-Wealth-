import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Phone, Mail, Lock, Shield, TrendingUp, Search, Filter, RefreshCcw, Info, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';

// KnowledgeHub Component
export function KnowledgeHub() {
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Mutual Funds',
    'Retirement',
    'Tax Planning',
    'Insurance',
    'Market Updates',
    'Personal Finance'
  ];

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Fetch multiple feeds for better coverage
      const feeds = [
        'https://economictimes.indiatimes.com/wealth/rssfeeds/8375551.cms',
        'https://economictimes.indiatimes.com/mf/rssfeeds/2146842.cms',
        'https://economictimes.indiatimes.com/rssfeedsdefault.cms'
      ];

      const allFetchedArticles: any[] = [];
      const today = new Date().toDateString();

      for (const feed of feeds) {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`);
        const data = await response.json();

        if (data.items) {
          data.items.forEach((item: any) => {
            const pubDate = new Date(item.pubDate).toDateString();
            // ONLY TODAY filter
            if (pubDate === today) {
              // Extract high-quality ET thumbnail if possible
              let thumbnail = item.thumbnail || item.enclosure?.link;

              if (!thumbnail && item.description) {
                const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch) thumbnail = imgMatch[1];
              }

              // De-duplicate by link
              if (!allFetchedArticles.find(a => a.link === item.link)) {
                allFetchedArticles.push({
                  ...item,
                  thumbnail: thumbnail || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop'
                });
              }
            }
          });
        }
      }

      // Sort by date descending
      allFetchedArticles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

      setArticles(allFetchedArticles);
      setFilteredArticles(allFetchedArticles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const filtered = articles.filter(article => {
      const title = article.title.toLowerCase();
      const desc = article.description?.toLowerCase() || '';
      const query = searchQuery.toLowerCase();

      const matchesSearch = title.includes(query) || desc.includes(query);
      const matchesCategory = selectedCategory === 'All' ||
        title.includes(selectedCategory.toLowerCase()) ||
        desc.includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
    setFilteredArticles(filtered);
  }, [articles, searchQuery, selectedCategory]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader
        title="Knowledge"
        highlightedText="Hub"
        subtitle="Real-time financial intelligence. Only today's most critical market updates and expert analysis."
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&auto=format&fit=crop&q=80"
        badge="Insights & Analysis"
        icon={<BookOpen className="w-4 h-4 text-white/80" />}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-[2.5rem] shadow-xl p-6 md:p-8 mb-12 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="relative w-full lg:max-w-md group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search today's headlines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="w-full lg:w-auto flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${selectedCategory === cat
                      ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <button
                onClick={fetchNews}
                className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-colors"
                title="Refresh News"
              >
                <RefreshCcw className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 mr-4 shadow-inner">
                <TrendingUp size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900 leading-none mb-2">Today's Briefing</h2>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  Live Feed from The Economic Times <span className="w-1 h-1 bg-rose-500 rounded-full animate-pulse"></span>
                </p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-2xl font-black text-teal-600">{filteredArticles.length}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Articles found</p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center h-96 gap-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-teal-100 rounded-full animate-ping absolute top-0 left-0"></div>
                <div className="w-20 h-20 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-teal-600 font-black animate-pulse uppercase tracking-widest text-sm">Synchronizing Data...</p>
            </div>
          ) : filteredArticles.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <AnimatePresence>
                {filteredArticles.map((item, index) => (
                  <motion.a
                    key={item.link}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-[2.5rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-blue-900 shadow-xl flex items-center gap-2">
                        <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                        NEW TODAY
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="p-10 flex flex-col flex-grow relative">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Financial News</span>
                        <span className="text-gray-300 text-[10px] font-bold">{new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-teal-600 transition-colors leading-tight line-clamp-3">
                        {item.title}
                      </h3>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center text-blue-600 font-black text-xs uppercase tracking-widest group-hover:gap-2 transition-all">
                          Explore Full Story <TrendingUp className="ml-2 w-4 h-4" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                          <RefreshCcw size={16} />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-white rounded-[3rem] p-20 text-center shadow-2xl border border-gray-100 max-w-2xl mx-auto"
            >
              <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Filter className="w-10 h-10 text-teal-600 opacity-20" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">Quiet Day in the Markets?</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-10">
                No new articles match your criteria today. Try broadening your category or checking back later this evening for new updates.
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="bg-teal-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-teal-600/30 hover:scale-105 transition-all"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}

          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full shadow-lg border border-gray-100">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Source Connectivity: Active</p>
              <div className="h-4 w-px bg-gray-100"></div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">The Economic Times Feed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Contact Component
export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    goal: '',
    message: '',
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&auto=format&fit=crop&q=80"
          alt="Contact us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/90 to-[#0d9488]/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-4">
            <Mail className="w-4 h-4 text-white/80" />
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Contact <span className="text-[#d4af37]">Us</span></h1>
          <p className="text-white/80 text-lg max-w-xl">Get personalized financial guidance from our expert team</p>
        </div>
      </div>

      {/* Quick contact cards */}
      <div className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            { icon: Phone, label: 'Call Us', value: '+91 98765 43210', sub: 'Mon–Sat: 9AM–6PM', href: 'tel:+919876543210', color: 'bg-blue-600' },
            { icon: Mail, label: 'Email Us', value: 'connect@vrkwealth.in', sub: 'Reply within 24 hours', href: 'mailto:connect@vrkwealth.in', color: 'bg-teal-600' },
            { icon: MapPin, label: 'Visit Us', value: 'Mumbai, Maharashtra', sub: 'India', href: '#', color: 'bg-purple-600' },
          ].map((item, i) => (
            <a key={i} href={item.href} className="group bg-white rounded-2xl shadow-xl border border-slate-100 p-6 flex items-center gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                <p className="font-black text-slate-900 text-sm">{item.value}</p>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
                <h2 className="text-2xl font-black text-[#1e3a8a] mb-2">Send Us a Message</h2>
                <p className="text-slate-500 text-sm mb-8">Fill in your details and we'll get back to you within 24 hours.</p>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 font-semibold text-sm">Thank you! We'll contact you soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-widest">Full Name *</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] outline-none transition-all text-sm bg-slate-50 focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-widest">Mobile Number *</label>
                      <input type="tel" required value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] outline-none transition-all text-sm bg-slate-50 focus:bg-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-widest">Email Address *</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] outline-none transition-all text-sm bg-slate-50 focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-widest">City</label>
                      <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Your city"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] outline-none transition-all text-sm bg-slate-50 focus:bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-widest">Your Financial Goal</label>
                    <select value={formData.goal} onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] outline-none transition-all text-sm bg-slate-50 focus:bg-white">
                      <option value="">Select a goal</option>
                      <option value="retirement">Retirement Planning</option>
                      <option value="education">Children's Education</option>
                      <option value="home">Home Purchase</option>
                      <option value="wealth">Wealth Creation</option>
                      <option value="tax">Tax Planning</option>
                      <option value="insurance">Insurance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-widest">Message</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more about your financial goals..."
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/20 focus:border-[#0d9488] outline-none transition-all text-sm bg-slate-50 focus:bg-white resize-none" />
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" required id="consent" checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 accent-[#0d9488]" />
                    <label htmlFor="consent" className="text-xs text-slate-600 leading-relaxed">
                      I consent to VRK Wealth contacting me regarding investment opportunities and financial advisory services *
                    </label>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#0d9488] text-white px-8 py-4 rounded-2xl font-black text-base shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                    Submit Inquiry →
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <div className="rounded-3xl overflow-hidden shadow-xl h-52">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=80" alt="Our team" className="w-full h-full object-cover" />
              </div>

              {/* WhatsApp */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">WhatsApp Us</h3>
                    <p className="text-green-100 text-xs">Quick response guaranteed</p>
                  </div>
                </div>
                <p className="text-green-100 text-sm mb-4">Get instant answers to your investment queries via WhatsApp.</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-white text-green-700 py-3 rounded-2xl font-black text-center text-sm hover:bg-green-50 transition-colors shadow-lg">
                  Chat on WhatsApp →
                </a>
              </div>

              {/* Office hours */}
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                    <Info className="w-4 h-4 text-white" />
                  </div>
                  Office Hours
                </h3>
                <div className="space-y-2">
                  {[
                    { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
                    { day: 'Saturday', time: '9:00 AM – 2:00 PM' },
                    { day: 'Sunday', time: 'Closed' },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                      <span className="text-sm font-semibold text-slate-700">{row.day}</span>
                      <span className="text-sm text-slate-500">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ClientLogin Component
export function ClientLogin() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Client"
        highlightedText="Login"
        subtitle="Access your portfolio and investment details securely"
        image="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&auto=format&fit=crop&q=80"
        badge="Secure Portal"
        icon={<Lock className="w-4 h-4 text-white/80" />}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <Lock className="mx-auto text-[#0d9488] mb-4" size={48} />
              <h2 className="text-2xl font-bold text-[#1e3a8a]">Secure Portal Access</h2>
            </div>

            <div className="space-y-4">
              <a href="#" className="block w-full bg-[#1e3a8a] text-white px-6 py-4 rounded-lg text-center hover:bg-[#0d9488] transition">
                Login to Portfolio Management System
              </a>
              <a href="#" className="block w-full bg-[#0d9488] text-white px-6 py-4 rounded-lg text-center hover:bg-[#1e3a8a] transition">
                AMC Website Login
              </a>
              <a href="#" className="block w-full bg-gray-600 text-white px-6 py-4 rounded-lg text-center hover:bg-gray-700 transition">
                CAMS Statement
              </a>
              <a href="#" className="block w-full bg-gray-600 text-white px-6 py-4 rounded-lg text-center hover:bg-gray-700 transition">
                Karvy Statement
              </a>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-gray-800">
                <strong>Security Notice:</strong> Never share your login credentials with anyone. VRK Wealth will never ask for your password via email or phone.
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">Need help accessing your account?</p>
              <Link to="/contact" className="text-[#0d9488] hover:underline font-semibold">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Compliance Pages
export function Disclaimer() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Disclaimer"
        subtitle="Important information about our services and regulatory disclosures"
        image="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&auto=format&fit=crop&q=80"
        badge="Legal & Compliance"
        icon={<Shield className="w-4 h-4 text-white/80" />}
      />

      <div className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose max-w-none space-y-4 text-gray-700">
            <p><strong>VRK Wealth</strong> is an AMFI Registered Mutual Fund Distributor (ARN: XXXXXX). This website provides general information about investment products and services offered by VRK Wealth.</p>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">Important Disclaimers:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Market Risks:</strong> Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.</li>
              <li><strong>No Guarantees:</strong> Past performance is not indicative of future returns. There are no guaranteed or assured returns on investments.</li>
              <li><strong>Regular Plans Only:</strong> VRK Wealth distributes Regular Mutual Fund Plans only. Regular plans have higher expense ratios compared to Direct plans as they include distributor commissions.</li>
              <li><strong>Commission Disclosure:</strong> VRK Wealth earns trail commission from Asset Management Companies (AMCs) for distribution services provided.</li>
              <li><strong>Advisory Nature:</strong> Information provided on this website is for educational purposes and should not be construed as investment advice. Please consult with our advisors before making investment decisions.</li>
              <li><strong>Accuracy of Information:</strong> While we strive to keep information accurate and updated, we make no representations or warranties about the completeness or accuracy of information on this website.</li>
              <li><strong>Third-Party Links:</strong> This website may contain links to third-party websites. VRK Wealth is not responsible for content on external sites.</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">Investor Responsibility:</h2>
            <p>Investors should:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Read all scheme documents (SID, SAI, KIM) before investing</li>
              <li>Understand the risks involved in different investment products</li>
              <li>Assess their own risk appetite and investment horizon</li>
              <li>Consult independent financial advisors if in doubt</li>
              <li>Review their portfolio regularly</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-6">
              <p className="font-bold">Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Privacy"
        highlightedText="Policy"
        subtitle="How we collect, use, and protect your personal information"
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&auto=format&fit=crop&q=80"
        badge="Your Data, Protected"
        icon={<Lock className="w-4 h-4 text-white/80" />}
      />

      <div className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose max-w-none space-y-4 text-gray-700">
            <p>VRK Wealth respects your privacy and is committed to protecting your personal information.</p>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">Information We Collect:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details (name, email, phone, address)</li>
              <li>Financial information (income, investment objectives, risk profile)</li>
              <li>KYC documents as required by regulations</li>
              <li>Transaction and investment history</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">How We Use Your Information:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide investment advisory and distribution services</li>
              <li>To process investment transactions</li>
              <li>To communicate about your investments and market updates</li>
              <li>To comply with regulatory requirements</li>
              <li>To improve our services</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">Data Security:</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">Information Sharing:</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AMCs and RTAs for investment processing</li>
              <li>Regulatory authorities as required by law</li>
              <li>Service providers who assist in our operations</li>
            </ul>

            <p className="mt-6">We do not sell or rent your personal information to third parties.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RiskDisclosure() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="Risk"
        highlightedText="Disclosure"
        subtitle="Understanding the risks associated with various investment products"
        image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&auto=format&fit=crop&q=80"
        badge="Investor Awareness"
        icon={<TrendingUp className="w-4 h-4 text-white/80" />}
      />

      <div className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose max-w-none space-y-4 text-gray-700">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
              <p className="font-bold text-red-800">All investments carry risk. Please read and understand the following risks before investing.</p>
            </div>

            <h2 className="text-2xl font-bold text-[#1e3a8a]">Market Risk:</h2>
            <p>The value of investments may fluctuate due to market conditions, economic factors, and other variables beyond control.</p>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">Equity Risk:</h2>
            <p>Equity investments are subject to higher volatility and can result in capital loss. Stock prices can fluctuate significantly.</p>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">Credit Risk:</h2>
            <p>Debt investments carry the risk of issuer default or downgrade in credit rating.</p>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">Liquidity Risk:</h2>
            <p>Some investments may be difficult to sell quickly at fair prices during market stress.</p>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">Interest Rate Risk:</h2>
            <p>Fixed income securities are sensitive to interest rate changes. Rising rates can reduce bond values.</p>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">Inflation Risk:</h2>
            <p>Returns may not keep pace with inflation, reducing purchasing power over time.</p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
              <p><strong>Important:</strong> Past performance does not guarantee future results. Investors should carefully assess their risk tolerance and invest accordingly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommissionDisclosure() {
  const commissionData = [
    { scheme: 'Equity Schemes', range: '0.75% - 1.50%' },
    { scheme: 'ELSS (Tax Saving)', range: '0.75% - 1.25%' },
    { scheme: 'Hybrid / Balanced Schemes', range: '0.50% - 1.25%' },
    { scheme: 'Debt / Income Schemes', range: '0.10% - 1.00%' },
    { scheme: 'Liquid / Money Market Schemes', range: '0.05% - 0.20%' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader
        title="Commission"
        highlightedText="Disclosure"
        subtitle="Complete transparency regarding our compensation and fee structure"
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&auto=format&fit=crop&q=80"
        badge="Full Transparency"
        icon={<Shield className="w-4 h-4 text-white/80" />}
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header / Intro */}
            <div className="p-10 md:p-16 border-b border-gray-100 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                  <Info size={24} />
                </div>
                <h2 className="text-3xl font-black text-[#1e3a8a]">Regulatory Compliance</h2>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed text-lg">
                In accordance with SEBI circular no. CIR/IMD/DF/13/2011 dated August 22, 2011, VRK Wealth hereby discloses the commission structure received from various Asset Management Companies (AMCs) for the distribution of mutual fund products.
              </p>
            </div>

            {/* Table Area */}
            <div className="p-10 md:p-16">
              <div className="overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1e3a8a] text-white">
                      <th className="px-8 py-6 text-sm font-black uppercase tracking-widest">Investment Category</th>
                      <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-right">Trail Commission Range (p.a.)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 uppercase tracking-tighter">
                    {commissionData.map((item, index) => (
                      <tr key={index} className="hover:bg-teal-50/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 size={18} className="text-teal-500 group-hover:scale-110 transition-transform" />
                            <span className="font-black text-gray-700">{item.scheme}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="bg-gray-100 text-[#1e3a8a] px-4 py-2 rounded-xl font-black group-hover:bg-[#1e3a8a] group-hover:text-white transition-all">
                            {item.range}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Disclaimer / Notes */}
              <div className="mt-12 space-y-6">
                <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100">
                  <h4 className="flex items-center gap-3 text-rose-900 font-black mb-4 hove">
                    <TrendingUp size={20} className="text-rose-500" />
                    Important Disclosure Notes
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "No Upfront commission is received by VRK Wealth.",
                      "Commission rates are subject to change by AMCs.",
                      "Direct plans do not involve any distribution fees.",
                      "The above rates are indicative trail commissions."
                    ].map((note, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-bold text-rose-800/70 leading-tight italic">
                        <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-1.5 flex-shrink-0"></span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-center justify-between p-8 bg-gray-50 rounded-3xl border border-gray-100">
                  <p className="text-gray-500 font-bold text-sm leading-relaxed max-w-lg">
                    For 100% transparency, you can request a detailed scheme-wise commission report for your portfolio.
                  </p>
                  <Link
                    to="/contact"
                    className="bg-[#1e3a8a] text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-900/20 hover:scale-105 transition-all text-sm uppercase tracking-widest flex items-center gap-3"
                  >
                    Request Detailed Report
                    <TrendingUp size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Regulatory Footer */}
            <div className="bg-[#1e3a8a]/5 p-8 text-center">
              <p className="text-[#1e3a8a] font-black text-[10px] uppercase tracking-[0.3em]">
                Mutual Fund investments are subject to market risks. read all scheme related documents carefully.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function KycAml() {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title="KYC & AML"
        highlightedText="Policy"
        subtitle="Our commitment to regulatory compliance and money laundering prevention"
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&auto=format&fit=crop&q=80"
        badge="Regulatory Compliance"
        icon={<Shield className="w-4 h-4 text-white/80" />}
      />

      <div className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose max-w-none space-y-4 text-gray-700">
            <p>VRK Wealth strictly adheres to Know Your Customer (KYC) and Anti-Money Laundering (AML) regulations as mandated by SEBI and other regulatory authorities.</p>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">KYC Requirements:</h2>
            <p>All investors must complete KYC before investing in mutual funds. This is a one-time process.</p>

            <h3 className="text-xl font-bold text-[#1e3a8a] mt-4">Documents Required:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Proof:</strong> PAN Card (mandatory), Aadhaar Card, Passport, Voter ID, or Driving License</li>
              <li><strong>Address Proof:</strong> Aadhaar Card, Passport, Voter ID, Driving License, or Utility Bills</li>
              <li><strong>Bank Proof:</strong> Cancelled cheque or Bank Statement</li>
              <li><strong>Photograph:</strong> Recent passport-size photograph</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">KYC Process:</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Submit KYC documents to KYC Registration Agency (KRA)</li>
              <li>Verification process (in-person or video-based)</li>
              <li>KYC registration confirmation (CVL)</li>
              <li>KYC valid for all SEBI registered intermediaries</li>
            </ol>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">AML Compliance:</h2>
            <p>VRK Wealth follows strict AML guidelines to prevent money laundering activities:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Customer Due Diligence (CDD) for all clients</li>
              <li>Enhanced Due Diligence (EDD) for high-risk clients</li>
              <li>Transaction monitoring for suspicious activities</li>
              <li>Reporting of Suspicious Transaction Reports (STR) to authorities</li>
              <li>Maintaining records as per regulatory requirements</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#1e3a8a] mt-6">Updation of KYC:</h2>
            <p>Investors must update their KYC every 10 years, or whenever there are changes in personal details.</p>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mt-6">
              <p><strong>Note:</strong> Non-compliance with KYC requirements may result in rejection of investment applications. This is a regulatory mandate, not a company policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
