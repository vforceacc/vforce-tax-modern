import { 
  Building, Users, TrendingUp, FileText, 
  Calculator, Wallet, UserCheck, BarChart3, PieChart, Landmark
} from 'lucide-react';

export const navigation = [
  {
    title: 'Business Tax',
    path: '/business-tax',
    icon: Building,
    subRoutes: [
      { 
        title: 'Income Tax Returns', 
        path: '/business-tax/income-tax-returns', 
        icon: FileText,
        desc: 'Professional returns for all structures.',
        content: [
          "Preparation of Income Tax Returns by a CPA Certified Accountant and ASIC Registered Agent for Partnerships, Companies, and Trusts.",
          "Navigating corporate tax regulations requires precision and foresight. Our Townsville-based tax experts delve deep into your financials to identify legitimate deductions and exemptions, ensuring you never pay more tax than legally required.",
          "We focus on long-term wealth protection and compliance, shielding your business from ATO audits while maximizing your annual returns."
        ],
        features: [
          { name: "Company Tax Returns", summary: "Expert preparation of annual company returns ensuring full compliance with ATO regulations." },
          { name: "Trust & Partnership Lodgments", summary: "Specialised handling of complex trust distributions and partnership income splitting." },
          { name: "Financial Reporting", summary: "Detailed P&L and Balance Sheet preparation for a clear view of your business health." }
        ]
      },
      { 
        title: 'ABN Registration', 
        path: '/business-tax/abn-registration', 
        icon: FileText,
        desc: 'Compliant ABN setup and registration.',
        content: [
          "Starting a new venture in North Queensland? We handle the paperwork so you can focus on the tools.",
          "Our ABN registration service goes beyond just getting a number. We provide strategic advice on the best business structure—whether that's a Sole Trader, Partnership, Company, or Trust—to protect your personal assets and optimize your tax position from day one.",
          "We also handle your TFN applications and GST registration if required, setting a solid, compliant foundation for your business growth."
        ],
        features: [
          { name: "Sole Trader & Company Setup", summary: "Choosing the right legal structure to protect your assets and optimise your tax position." },
          { name: "Partnership Agreements", summary: "Drafting clear agreements to ensure all partners are aligned and protected." },
          { name: "Trust Structures", summary: "Setting up discretionary or unit trusts for optimal asset protection and tax flexibility." }
        ]
      },
      { 
        title: 'GST & BAS Preparation', 
        path: '/business-tax/gst-bas-preparation', 
        icon: Calculator,
        desc: 'Accurate and timely BAS lodgment.',
        content: [
          "Don't let the quarterly BAS cycle slow you down. We streamline your GST reporting, ensuring every credit is claimed and every deadline is met.",
          "Our precise reconciliation process guarantees that your accounts perfectly match your GST records, significantly reducing the risk of ATO audits and penalties.",
          "We integrate seamlessly with modern accounting platforms like Xero, MYOB, and QuickBooks, transforming a stressful compliance burden into a smooth, automated workflow for your Townsville business."
        ],
        features: [
          { name: "Quarterly BAS Lodgment", summary: "Accurate calculation and timely submission of your Business Activity Statements." },
          { name: "IAS Returns", summary: "Management of your Instalment Activity Statements to stay on top of PAYG obligations." },
          { name: "GST Reconciliation", summary: "Ensuring your accounts perfectly match your GST records to avoid ATO audits." }
        ]
      },
      { 
        title: 'Payroll Services', 
        path: '/business-tax/payroll-services', 
        icon: Wallet,
        desc: 'Streamlined employee management.',
        content: [
          "Managing a team in Townsville? We handle Single Touch Payroll (STP 2.0) compliance, superannuation guarantee payments, and WorkCover reporting.",
          "Payroll mistakes can be costly and damage employee morale. Our dedicated payroll services ensure that your staff are paid accurately and on time, every time, while strictly adhering to complex modern awards.",
          "Keep your team happy and the ATO off your back with our end-to-end payroll management solutions."
        ],
        features: [
          { name: "STP 2.0 Compliance", summary: "Real-time reporting of payroll data to the ATO as required by the latest law." },
          { name: "Superannuation Tracking", summary: "Ensuring your super obligations are calculated correctly and paid on time." },
          { name: "Annual Wage Reviews", summary: "Analysing your payroll costs and ensuring compliance with industry awards." }
        ]
      }
    ]
  },
  {
    title: 'Individual Tax',
    path: '/individual-tax',
    icon: Users,
    subRoutes: [
      { 
        title: 'PAYG Services', 
        path: '/individual-tax/payg-services', 
        icon: UserCheck,
        desc: "Tax time made easy—no dramas.",
        content: [
          "Whether you're working at the Port, the Hospital, or James Cook University, we ensure your PAYG return is maximized. Tax time made easy—no dramas.",
          "We know the local industries inside out and know exactly what you can legally claim, from laundry allowances to specific tools of the trade and home office expenses.",
          "Stop leaving money on the table. Our fast e-lodgment service means most refunds are processed securely and land in your bank account within 10-14 days."
        ],
        features: [
          { name: "Professional Tax Returns", summary: "Fast, accurate preparation of your individual tax return by a qualified expert." },
          { name: "Deduction Optimisation", summary: "Identifying every legal deduction available to increase your refund." },
          { name: "Fast E-Lodgment", summary: "Most refunds processed and in your bank account within 10-14 days." }
        ]
      },
      { 
        title: 'Investment Services', 
        path: '/individual-tax/investment-services', 
        icon: Landmark,
        desc: "Property and share portfolios sorted.",
        content: [
          "Investing in the Townsville property market or building a share portfolio? We handle Capital Gains Tax (CGT) calculations, rental property schedules, and negative gearing advice.",
          "Protect your wealth with precise, compliant reporting. We ensure that every eligible deduction—including depreciation, interest, and maintenance—is claimed against your investment properties.",
          "For share investors, we meticulously track dividends and franking credits to optimize your overall tax position and enhance your portfolio's net return."
        ],
        features: [
          { name: "Rental Property Schedules", summary: "Correct handling of depreciation, interest, and repairs for your investment property." },
          { name: "CGT Calculations", summary: "Accurate calculation of capital gains on shares, property, and crypto assets." },
          { name: "Dividend Tracking", summary: "Ensuring all your investment income is correctly reported and franking credits claimed." }
        ]
      },
      { 
        title: 'Tax Time Tips', 
        path: '/individual-tax/tax-time-tips', 
        icon: PieChart,
        desc: "Get the most out of your hard work.",
        content: [
          "Preparation is the key to a stress-free tax season. Get the most out of your hard work with our tailored tax planning.",
          "We provide a comprehensive checklist for Aussie workers to ensure you're keeping the right receipts and tracking the right kilometres throughout the year. Don't wait until June to start thinking about deductions.",
          "From setting up receipt-capture apps like Dext to maintaining bulletproof vehicle logbooks, we give you the tools to audit-proof your claims and maximize your refund."
        ],
        features: [
          { name: "Logbook Management", summary: "How to correctly maintain a logbook for maximum vehicle expense claims." },
          { name: "Receipt Apps Integration", summary: "Setting up apps like Dext or Hubdoc to capture expenses on the go." },
          { name: "Industry Specific Advice", summary: "Custom advice for Nurses, Tradies, Teachers, and Port workers." }
        ]
      }
    ]
  },
  {
    title: 'Business Services',
    path: '/business-services',
    icon: TrendingUp,
    subRoutes: [
      { 
        title: 'Tax Planning', 
        path: '/business-services/tax-planning', 
        icon: TrendingUp,
        desc: 'Forward-thinking tax strategies.',
        content: [
          "Don't wait until June 30. Our proactive tax planning sessions look at your year-to-date figures to implement legal strategies that minimize your tax liability.",
          "We provide accurate profit projections and identify opportunities to leverage the Instant Asset Write-Off, ensuring you reinvest in your business rather than overpaying the ATO.",
          "For family businesses, we offer expert planning on trust distributions to optimize tax outcomes across your entire family group, protecting your hard-earned wealth."
        ],
        features: [
          { name: "Profit Projections", summary: "Accurate estimates of your year-end profit to avoid tax surprises." },
          { name: "Asset Write-off Advice", summary: "Strategies to use the Instant Asset Write-Off to reduce your current year tax." },
          { name: "Trust Distributions", summary: "Expert planning of trust distributions to optimise family tax outcomes." }
        ]
      },
      { 
        title: 'Financial Analysis', 
        path: '/business-services/financial-analysis', 
        icon: BarChart3,
        desc: 'Data-driven business insights.',
        content: [
          "We translate complex numbers into a clear growth roadmap. Our analysis helps Townsville business owners understand their margins, break-even points, and true profitability.",
          "Stop guessing and start planning. With our cash flow forecasting and KPI benchmarking, you'll know exactly how your business performs against local NQ industry standards.",
          "We provide actionable Budget vs Actual reports, uncovering hidden costs and identifying where the real profit is hiding in your day-to-day operations."
        ],
        features: [
          { name: "Cash Flow Forecasting", summary: "Predicting your cash position to ensure you can always pay bills and staff." },
          { name: "KPI Benchmarking", summary: "Comparing your performance against industry standards in Townsville and NQ." },
          { name: "Budget vs Actual Reports", summary: "Tracking your progress against your goals to keep your business on course." }
        ]
      },
      { 
        title: 'Bookkeeping', 
        path: '/business-services/bookkeeping', 
        icon: Landmark,
        desc: 'Accurate financial statements.',
        content: [
          "Maintain accurate financial statements to track performance and make informed financial decisions with real-time, reliable data.",
          "Our daily Xero reconciliations ensure your bank transactions always match your accounting records, eliminating end-of-month stress and financial blind spots.",
          "With our regular data integrity audits and clear monthly reporting, you remain firmly in control of your business's financial pulse without having to do the heavy lifting."
        ],
        features: [
          { name: "Xero Reconciliation", summary: "Daily matching of your bank transactions to your accounting records." },
          { name: "Data Integrity", summary: "Regular audits of your data entry to ensure your numbers are always reliable." },
          { name: "Monthly Reporting", summary: "Clear, concise reports delivered to you every month to keep you in control." }
        ]
      },
      { 
        title: 'Business Advisory', 
        path: '/business-services/business-advisory', 
        icon: TrendingUp,
        desc: 'Strategic guidance for growth.',
        content: [
          "Receive strategic guidance and actionable insights to drive business growth and financial success in the competitive North Queensland economy.",
          "We don't just look at the past; we plan for the future. From reviewing your current entity structure to long-term scalability planning, our advisory services are designed to protect and grow your enterprise.",
          "Whether you are looking to aggressively expand or preparing for a succession plan and sale, our expert CPA advisors will guide you safely and profitably."
        ],
        features: [
          { name: "Growth Strategy", summary: "Long-term planning to scale your operations safely and profitably." },
          { name: "Structure Review", summary: "Assessing if your current entity (Company, Trust, etc.) still meets your needs." },
          { name: "Succession Planning", summary: "Preparing your business for eventual sale or transfer to the next generation." }
        ]
      }
    ]
  }
];
