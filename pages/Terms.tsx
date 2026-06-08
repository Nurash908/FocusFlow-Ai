import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BrandedLogo } from '../components/BrandedLogo';

export const Terms: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-indigo-500/30">
            <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center group">
                        <ArrowLeft size={20} className="text-slate-400 group-hover:text-white mr-4 transition-colors" />
                        <BrandedLogo size="sm" withText={true} />
                    </Link>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
                <p className="text-slate-400 mb-12">Last updated: March 13, 2026</p>

                <div className="space-y-8 text-slate-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using SmartNotesGPT, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                        <p>
                            SmartNotesGPT provides an AI-powered platform for analyzing and interacting with documents. We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
                        <p className="mb-4">
                            To use certain features of the service, you must register for an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account.
                        </p>
                        <p>
                            You agree to notify us immediately of any unauthorized use of your account or password, or any other breach of security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. User Content</h2>
                        <p className="mb-4">
                            You retain all rights to the documents and content you upload to SmartNotesGPT. By uploading content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, process, and display that content solely for the purpose of providing the service to you.
                        </p>
                        <p>
                            You represent and warrant that you have all necessary rights to upload the content and that it does not violate any third-party rights or applicable laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Acceptable Use</h2>
                        <p className="mb-4">
                            You agree not to use the service to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Upload content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
                            <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                            <li>Interfere with or disrupt the service or servers or networks connected to the service.</li>
                            <li>Attempt to gain unauthorized access to any portion of the service or any other systems or networks connected to the service.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                        <p>
                            The service and its original content, features, and functionality are and will remain the exclusive property of SmartNotesGPT and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                        <p>
                            In no event shall SmartNotesGPT, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
                        <p>
                            These Terms shall be governed and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at legal@smartnotesgpt.com.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
};
