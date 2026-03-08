"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileSignature, Download, Briefcase, Users, Palette, Code, Calendar, DollarSign, FileText } from "lucide-react";

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
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "consulting",
    name: "Consulting Agreement",
    description: "Professional consulting services contract",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "design",
    name: "Design Services Agreement",
    description: "Graphic design or creative services contract",
    icon: Palette,
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: "development",
    name: "Web Development Agreement",
    description: "Website or software development contract",
    icon: Code,
    color: "bg-emerald-50 text-emerald-600",
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-white">
        <div className="container py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-violet-50">
                  <FileSignature className="h-4 w-4 text-violet-600" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contract Generator</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create Contract</h1>
              <p className="text-muted-foreground mt-1">Generate professional contract templates</p>
            </div>
            <Button onClick={handlePrint} className="rounded-full bg-slate-900 hover:bg-slate-800">
              <Download className="h-4 w-4 mr-2" />
              Download Contract
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Template Selection */}
            <Card className="border-border/50 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-600">1</span>
                  Select Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {contractTemplates.map((template) => {
                    const Icon = template.icon;
                    const isSelected = details.templateType === template.id;
                    return (
                      <button
                        key={template.id}
                        onClick={() => setDetails({ ...details, templateType: template.id })}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected 
                            ? "border-slate-900 bg-slate-50" 
                            : "border-border/50 hover:border-border hover:bg-muted/30"
                        }`}
                      >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${template.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className={`font-medium text-sm ${isSelected ? "text-slate-900" : "text-foreground"}`}>
                            {template.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{template.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Contract Details */}
            <Card className="border-border/50 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-xs font-bold text-slate-600">2</span>
                  Contract Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Provider */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <SelectedIcon className="h-4 w-4" />
                    Service Provider (You)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase">Full Name</Label>
                      <Input
                        placeholder="Your name or company"
                        value={details.contractorName}
                        onChange={(e) =>
                          setDetails({ ...details, contractorName: e.target.value })
                        }
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase">Email</Label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={details.contractorEmail}
                        onChange={(e) =>
                          setDetails({ ...details, contractorEmail: e.target.value })
                        }
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Client */}
                <div className="space-y-4 pt-4 border-t border-border/30">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Client Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase">Client Name</Label>
                      <Input
                        placeholder="Client name or company"
                        value={details.clientName}
                        onChange={(e) =>
                          setDetails({ ...details, clientName: e.target.value })
                        }
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase">Client Email</Label>
                      <Input
                        type="email"
                        placeholder="client@email.com"
                        value={details.clientEmail}
                        onChange={(e) =>
                          setDetails({ ...details, clientEmail: e.target.value })
                        }
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Project */}
                <div className="space-y-4 pt-4 border-t border-border/30">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Project Details
                  </h4>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase">Project Name</Label>
                    <Input
                      placeholder="What is this project called?"
                      value={details.projectName}
                      onChange={(e) =>
                        setDetails({ ...details, projectName: e.target.value })
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-muted-foreground uppercase">Project Description</Label>
                    <Textarea
                      placeholder="Describe the scope of work..."
                      value={details.projectDescription}
                      onChange={(e) =>
                        setDetails({ ...details, projectDescription: e.target.value })
                      }
                      rows={3}
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4 pt-4 border-t border-border/30">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Timeline
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase">Start Date</Label>
                      <Input
                        type="date"
                        value={details.startDate}
                        onChange={(e) =>
                          setDetails({ ...details, startDate: e.target.value })
                        }
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase">End Date</Label>
                      <Input
                        type="date"
                        value={details.endDate}
                        onChange={(e) =>
                          setDetails({ ...details, endDate: e.target.value })
                        }
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="space-y-4 pt-4 border-t border-border/30">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Payment Terms
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase">Payment Amount</Label>
                      <Input
                        placeholder="$1,000"
                        value={details.paymentAmount}
                        onChange={(e) =>
                          setDetails({ ...details, paymentAmount: e.target.value })
                        }
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-medium text-muted-foreground uppercase">Payment Terms</Label>
                      <Select
                        value={details.paymentTerms}
                        onValueChange={(value) =>
                          setDetails({ ...details, paymentTerms: value || "Net 30" })
                        }
                      >
                        <SelectTrigger className="h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                          <SelectItem value="Net 15">Net 15</SelectItem>
                          <SelectItem value="Net 30">Net 30</SelectItem>
                          <SelectItem value="Net 60">Net 60</SelectItem>
                          <SelectItem value="50% upfront, 50% on completion">50% upfront, 50% on completion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Terms */}
                <div className="space-y-4 pt-4 border-t border-border/30">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Additional Terms</h4>
                  <Textarea
                    placeholder="Any special conditions, cancellation policy, or additional terms..."
                    value={details.additionalTerms}
                    onChange={(e) =>
                      setDetails({ ...details, additionalTerms: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4">
              <Card className="border-border/50 shadow-elevated overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-border/50 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contract Preview</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-600 font-medium">Live</span>
                  </div>
                </div>
                <CardContent className="p-6 print:p-0">
                  <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-foreground leading-relaxed">
                    {getTemplateContent()}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
