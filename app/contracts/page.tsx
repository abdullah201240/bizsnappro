"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileSignature, 
  Download, 
  Briefcase, 
  Users, 
  Palette, 
  Code, 
  Calendar, 
  DollarSign, 
  FileText,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

interface ContractDetails {
  templateType: string;
  contractorName: string;
  contractorEmail: string;
  clientName: string;
  clientEmail: string;
  projectName: string;
  projectDescription: string;
  startDate: string;
  endDate: string;
  paymentAmount: string;
  paymentTerms: string;
  additionalTerms: string;
}

const contractTemplates = [
  {
    id: "freelance",
    name: "Freelance Service Agreement",
    description: "General freelance contract for services",
    icon: Briefcase,
    gradient: "from-blue-500/20 to-blue-600/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
  },
  {
    id: "consulting",
    name: "Consulting Agreement",
    description: "Professional consulting services contract",
    icon: Users,
    gradient: "from-purple-500/20 to-purple-600/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
  },
  {
    id: "design",
    name: "Design Services Agreement",
    description: "Graphic design or creative services contract",
    icon: Palette,
    gradient: "from-pink-500/20 to-pink-600/20",
    border: "border-pink-500/30",
    text: "text-pink-400",
  },
  {
    id: "development",
    name: "Web Development Agreement",
    description: "Website or software development contract",
    icon: Code,
    gradient: "from-emerald-500/20 to-emerald-600/20",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
  },
];

export default function ContractsPage() {
  const [details, setDetails] = useState<ContractDetails>({
    templateType: "freelance",
    contractorName: "",
    contractorEmail: "",
    clientName: "",
    clientEmail: "",
    projectName: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    paymentAmount: "",
    paymentTerms: "Net 30",
    additionalTerms: "",
  });

  const handlePrint = () => {
    window.print();
  };

  const getTemplateContent = () => {
    const date = new Date().toLocaleDateString();
    
    switch (details.templateType) {
      case "freelance":
        return `FREELANCE SERVICE AGREEMENT

This Freelance Service Agreement ("Agreement") is entered into as of ${date}.

BETWEEN:
${details.clientName || "[Client Name]"} ("Client")
${details.clientEmail ? `Email: ${details.clientEmail}` : ""}

AND:
${details.contractorName || "[Contractor Name]"} ("Contractor")
${details.contractorEmail ? `Email: ${details.contractorEmail}` : ""}

1. SERVICES
Contractor agrees to provide the following services:
${details.projectName || "[Project Name]"}
${details.projectDescription || "[Project Description]"}

2. TERM
This Agreement shall commence on ${details.startDate || "[Start Date]"} and end on ${details.endDate || "[End Date]"}.

3. COMPENSATION
Client agrees to pay Contractor: ${details.paymentAmount || "[Amount]"}
Payment Terms: ${details.paymentTerms}

4. ADDITIONAL TERMS
${details.additionalTerms || "No additional terms specified."}

5. SIGNATURES

_________________________          _________________________
${details.clientName || "Client Name"}            ${details.contractorName || "Contractor Name"}
Date: _______________            Date: _______________`;

      case "consulting":
        return `CONSULTING AGREEMENT

This Consulting Agreement ("Agreement") is entered into as of ${date}.

BETWEEN:
${details.clientName || "[Client Name]"} ("Company")
AND:
${details.contractorName || "[Consultant Name]"} ("Consultant")

1. SCOPE OF SERVICES
Consultant agrees to provide consulting services for:
${details.projectName || "[Project]"}
${details.projectDescription || "[Description]"}

2. TERM
Start Date: ${details.startDate || "[Start Date]"}
End Date: ${details.endDate || "[End Date]"}

3. FEES
Consulting Fee: ${details.paymentAmount || "[Amount]"}
Terms: ${details.paymentTerms}

4. ADDITIONAL TERMS
${details.additionalTerms || "Standard consulting terms apply."}

SIGNATURES:

_________________________          _________________________
Client                          Consultant
Date: _______________            Date: _______________`;

      case "design":
        return `DESIGN SERVICES AGREEMENT

This Design Services Agreement ("Agreement") is entered into as of ${date}.

CLIENT: ${details.clientName || "[Client Name]"}
EMAIL: ${details.clientEmail || "[Email]"}

DESIGNER: ${details.contractorName || "[Designer Name]"}
EMAIL: ${details.contractorEmail || "[Email]"}

PROJECT: ${details.projectName || "[Project Name]"}

DESCRIPTION:
${details.projectDescription || "[Project Description]"}

TIMELINE:
Start: ${details.startDate || "[Start Date]"}
Due: ${details.endDate || "[End Date]"}

FEE: ${details.paymentAmount || "[Amount]"}
PAYMENT TERMS: ${details.paymentTerms}

ADDITIONAL TERMS:
${details.additionalTerms || "None"}

_________________________          _________________________
Client                          Designer
Date: _______________            Date: _______________`;

      case "development":
        return `WEB DEVELOPMENT AGREEMENT

This Web Development Agreement ("Agreement") is entered into as of ${date}.

CLIENT: ${details.clientName || "[Client Name]"}
DEVELOPER: ${details.contractorName || "[Developer Name]"}

PROJECT: ${details.projectName || "[Project Name]"}

SCOPE OF WORK:
${details.projectDescription || "[Project Description]"}

TIMELINE:
Start Date: ${details.startDate || "[Start Date]"}
Completion Date: ${details.endDate || "[End Date]"}

PROJECT FEE: ${details.paymentAmount || "[Amount]"}
PAYMENT TERMS: ${details.paymentTerms}

ADDITIONAL TERMS:
${details.additionalTerms || "Standard development terms apply."}

_________________________          _________________________
Client                          Developer
Date: _______________            Date: _______________`;

      default:
        return "";
    }
  };

  const selectedTemplate = contractTemplates.find(t => t.id === details.templateType);
  const SelectedIcon = selectedTemplate?.icon || Briefcase;

  return (
    <div className="min-h-screen bg-[#05050a] text-white font-sans">
      {/* Header */}
      <header className="bg-gradient-to-b from-violet-500/8 to-transparent border-b border-white/6 relative overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-5 md:px-10 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/20 flex items-center justify-center">
                  <FileSignature className="w-5 h-5 text-violet-400" />
                </div>
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Contract Generator</span>
              </div>
              <h1 className="font-syne text-2xl md:text-3xl font-extrabold text-white mb-2">Create Contract</h1>
              <p className="text-sm text-white/50">Generate professional contract templates</p>
            </div>
            <button 
              onClick={handlePrint}
              className="h-11 px-5 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-500/30 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Contract
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-5 md:px-10 py-8">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Template Selection */}
            <div className="bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/6">
                <h2 className="font-syne text-base font-bold text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white/70">1</span>
                  Select Template
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {contractTemplates.map((template) => {
                    const Icon = template.icon;
                    const isSelected = details.templateType === template.id;
                    return (
                      <button
                        key={template.id}
                        onClick={() => setDetails({ ...details, templateType: template.id })}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected 
                            ? `border-violet-500/50 bg-violet-500/10` 
                            : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                        }`}
                      >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${template.gradient} border ${template.border}`}>
                          <Icon className={`h-5 w-5 ${template.text}`} />
                        </div>
                        <div>
                          <p className={`font-medium text-sm ${isSelected ? "text-white" : "text-white/80"}`}>
                            {template.name}
                          </p>
                          <p className="text-xs text-white/40 mt-0.5">{template.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contract Details */}
            <div className="bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/6">
                <h2 className="font-syne text-base font-bold text-white flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-white/70">2</span>
                  Contract Details
                </h2>
              </div>
              <div className="p-6 space-y-6">
                {/* Service Provider */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider flex items-center gap-2">
                    <SelectedIcon className="h-4 w-4" />
                    Service Provider (You)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Full Name</Label>
                      <Input
                        placeholder="Your name or company"
                        value={details.contractorName}
                        onChange={(e) =>
                          setDetails({ ...details, contractorName: e.target.value })
                        }
                        className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Email</Label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={details.contractorEmail}
                        onChange={(e) =>
                          setDetails({ ...details, contractorEmail: e.target.value })
                        }
                        className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Client */}
                <div className="space-y-4 pt-5 border-t border-white/6">
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Client Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Client Name</Label>
                      <Input
                        placeholder="Client name or company"
                        value={details.clientName}
                        onChange={(e) =>
                          setDetails({ ...details, clientName: e.target.value })
                        }
                        className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Client Email</Label>
                      <Input
                        type="email"
                        placeholder="client@email.com"
                        value={details.clientEmail}
                        onChange={(e) =>
                          setDetails({ ...details, clientEmail: e.target.value })
                        }
                        className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Project */}
                <div className="space-y-4 pt-5 border-t border-white/6">
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Project Details
                  </h4>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Project Name</Label>
                    <Input
                      placeholder="What is this project called?"
                      value={details.projectName}
                      onChange={(e) =>
                        setDetails({ ...details, projectName: e.target.value })
                      }
                      className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Project Description</Label>
                    <Textarea
                      placeholder="Describe the scope of work..."
                      value={details.projectDescription}
                      onChange={(e) =>
                        setDetails({ ...details, projectDescription: e.target.value })
                      }
                      className="bg-white/5 border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 min-h-[80px] resize-none"
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4 pt-5 border-t border-white/6">
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Timeline
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Start Date</Label>
                      <Input
                        type="date"
                        value={details.startDate}
                        onChange={(e) =>
                          setDetails({ ...details, startDate: e.target.value })
                        }
                        className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">End Date</Label>
                      <Input
                        type="date"
                        value={details.endDate}
                        onChange={(e) =>
                          setDetails({ ...details, endDate: e.target.value })
                        }
                        className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="space-y-4 pt-5 border-t border-white/6">
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Payment Terms
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Payment Amount</Label>
                      <Input
                        placeholder="$1,000"
                        value={details.paymentAmount}
                        onChange={(e) =>
                          setDetails({ ...details, paymentAmount: e.target.value })
                        }
                        className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white placeholder:text-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">Payment Terms</Label>
                      <Select
                        value={details.paymentTerms}
                        onValueChange={(value) =>
                          setDetails({ ...details, paymentTerms: value || "Net 30" })
                        }
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-11 text-sm text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#05050a] border-white/10">
                          <SelectItem value="Due on receipt" className="text-white focus:bg-white/10">Due on receipt</SelectItem>
                          <SelectItem value="Net 15" className="text-white focus:bg-white/10">Net 15</SelectItem>
                          <SelectItem value="Net 30" className="text-white focus:bg-white/10">Net 30</SelectItem>
                          <SelectItem value="Net 60" className="text-white focus:bg-white/10">Net 60</SelectItem>
                          <SelectItem value="50% upfront, 50% on completion" className="text-white focus:bg-white/10">50% upfront, 50% on completion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Terms */}
                <div className="space-y-4 pt-5 border-t border-white/6">
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Additional Terms</h4>
                  <Textarea
                    placeholder="Any special conditions, cancellation policy, or additional terms..."
                    value={details.additionalTerms}
                    onChange={(e) =>
                      setDetails({ ...details, additionalTerms: e.target.value })
                    }
                    className="bg-white/5 border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 min-h-[80px] resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 space-y-4">
              <div className="bg-white/[0.02] border border-white/6 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between">
                  <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Contract Preview</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-400 font-medium">Live</span>
                  </div>
                </div>
                <div className="p-6">
                  <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-white/70 leading-relaxed">
                    {getTemplateContent()}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
