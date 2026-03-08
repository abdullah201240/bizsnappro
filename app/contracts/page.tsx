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
import { FileSignature, Download } from "lucide-react";

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
  },
  {
    id: "consulting",
    name: "Consulting Agreement",
    description: "Professional consulting services contract",
  },
  {
    id: "design",
    name: "Design Services Agreement",
    description: "Graphic design or creative services contract",
  },
  {
    id: "development",
    name: "Web Development Agreement",
    description: "Website or software development contract",
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

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Contract Templates</h1>
        <p className="text-muted-foreground">
          Generate professional contract templates
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Template</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={details.templateType}
                onValueChange={(value) =>
                  setDetails({ ...details, templateType: value || "freelance" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {contractTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {template.description}
                        </p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Your Name</Label>
                  <Input
                    placeholder="Contractor/Service Provider"
                    value={details.contractorName}
                    onChange={(e) =>
                      setDetails({ ...details, contractorName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Your Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={details.contractorEmail}
                    onChange={(e) =>
                      setDetails({ ...details, contractorEmail: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client Name</Label>
                  <Input
                    placeholder="Client name"
                    value={details.clientName}
                    onChange={(e) =>
                      setDetails({ ...details, clientName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Client Email</Label>
                  <Input
                    type="email"
                    placeholder="client@email.com"
                    value={details.clientEmail}
                    onChange={(e) =>
                      setDetails({ ...details, clientEmail: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  placeholder="What is this project?"
                  value={details.projectName}
                  onChange={(e) =>
                    setDetails({ ...details, projectName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Project Description</Label>
                <Textarea
                  placeholder="Describe the services..."
                  value={details.projectDescription}
                  onChange={(e) =>
                    setDetails({ ...details, projectDescription: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={details.startDate}
                    onChange={(e) =>
                      setDetails({ ...details, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={details.endDate}
                    onChange={(e) =>
                      setDetails({ ...details, endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Payment Amount</Label>
                  <Input
                    placeholder="$1,000"
                    value={details.paymentAmount}
                    onChange={(e) =>
                      setDetails({ ...details, paymentAmount: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Payment Terms</Label>
                  <Select
                    value={details.paymentTerms}
                    onValueChange={(value) =>
                      setDetails({ ...details, paymentTerms: value || "Net 30" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Due on receipt">Due on receipt</SelectItem>
                      <SelectItem value="Net 15">Net 15</SelectItem>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                      <SelectItem value="50% upfront, 50% on completion">
                        50% upfront, 50% on completion
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Terms</Label>
                <Textarea
                  placeholder="Any special conditions..."
                  value={details.additionalTerms}
                  onChange={(e) =>
                    setDetails({ ...details, additionalTerms: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={handlePrint} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Contract
            </Button>
          </div>

          <div className="border rounded-lg bg-white p-8 shadow-lg print:shadow-none print:border-0">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
              {getTemplateContent()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
