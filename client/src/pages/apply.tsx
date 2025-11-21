import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import propertiesData from "@/data/properties.json";
import { CheckCircle2, AlertCircle, Upload, UserPlus, Trash2, FileText, ArrowRight, ArrowLeft, Shield, Clock } from "lucide-react";

// Schema
const applySchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  currentAddress: z.string().min(5, "Current address is required"),
  employer: z.string().min(2, "Employer name is required"),
  income: z.string().min(1, "Annual income is required"),
  moveInDate: z.string().min(1, "Move-in date is required"),
  hasCoApplicant: z.boolean().default(false),
  coApplicantName: z.string().optional(),
  coApplicantEmail: z.string().optional(),
  consent: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

type ApplyFormValues = z.infer<typeof applySchema>;

const steps = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Employment" },
  { id: 3, label: "Documents" },
  { id: 4, label: "Review" }
];

export default function Apply() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const propertyId = searchParams.get("propertyId");
  const property = propertiesData.find(p => p.id === propertyId);
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{name: string, type: string}>>([]);

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      currentAddress: "",
      employer: "",
      income: "",
      moveInDate: "",
      hasCoApplicant: false,
      coApplicantName: "",
      coApplicantEmail: "",
      consent: false,
    },
    mode: "onChange"
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFiles(prev => [...prev, { name: file.name, type: file.type }]);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been added to your application.`
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ["firstName", "lastName", "email", "phone", "currentAddress"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["employer", "income", "moveInDate"];
      if (form.getValues("hasCoApplicant")) {
        fieldsToValidate.push("coApplicantName", "coApplicantEmail");
      }
    }

    const isValid = await form.trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const onSubmit = (data: ApplyFormValues) => {
    console.log("Form Submitted:", { ...data, files: uploadedFiles });
    // Mock submission delay
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Application Submitted",
        description: "We have received your application and will review it shortly.",
      });
      window.scrollTo(0, 0);
    }, 1500);
  };

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4 bg-muted/20">
          <Card className="max-w-md w-full text-center p-8 border-t-4 border-t-success shadow-lg">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-in zoom-in duration-500">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-2">Application Received!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for applying. Our team will review your information and contact you within 24-48 hours.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg mb-8 text-left text-sm">
              <p className="font-semibold mb-2">Next Steps:</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Wait for email confirmation</li>
                <li>Background check initiation</li>
                <li>Income verification</li>
              </ul>
            </div>
            <Button onClick={() => setLocation("/")} className="w-full bg-primary h-12 text-lg font-bold">
              Return Home
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full transform translate-x-10 -translate-y-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="max-w-3xl">
              <h1 className="font-heading text-3xl font-bold mb-2 flex items-center gap-3">
                <FileText className="h-8 w-8 text-accent" />
                Rental Application
              </h1>
              <p className="text-white/90">
                {property 
                  ? `Applying for: ${property.title}`
                  : "Complete the form below to apply for a property."}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" /> Est. time: 5-10 mins
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative mb-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              {steps.map((step) => (
                <span 
                  key={step.id} 
                  className={`${currentStep >= step.id ? "text-primary font-bold" : ""} transition-colors`}
                >
                  {step.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1 bg-muted/10">
        <div className="max-w-3xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">1</span>
                      Personal Information
                    </CardTitle>
                    <CardDescription>Tell us about yourself.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="currentAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Address <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Textarea placeholder="123 Main St, City, State, Zip" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="justify-end pt-6 border-t bg-muted/5">
                    <Button type="button" onClick={nextStep} className="bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold">
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Step 2: Employment & Financial */}
              {currentStep === 2 && (
                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">2</span>
                      Employment & Financial
                    </CardTitle>
                    <CardDescription>Help us verify your income.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="employer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Employer <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Company Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="income"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Annual Income ($) <span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="50000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="moveInDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Desired Move-in Date <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <FormField
                      control={form.control}
                      name="hasCoApplicant"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-muted/20">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Co-Applicant</FormLabel>
                            <CardDescription>
                              Will anyone else be signing the lease with you?
                            </CardDescription>
                          </div>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("hasCoApplicant") && (
                      <div className="space-y-4 p-4 bg-muted/20 rounded-lg animate-in fade-in slide-in-from-top-2">
                        <h4 className="font-medium flex items-center gap-2">
                          <UserPlus className="h-4 w-4" /> Co-Applicant Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="coApplicantName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Jane Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="coApplicantEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="jane@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="justify-between pt-6 border-t bg-muted/5">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button type="button" onClick={nextStep} className="bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold">
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">3</span>
                      Document Upload
                    </CardTitle>
                    <CardDescription>Please upload proof of income and identification.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:bg-muted/10 transition-colors cursor-pointer relative">
                      <input 
                        type="file" 
                        onChange={handleFileUpload} 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                          <Upload className="h-6 w-6" />
                        </div>
                        <h4 className="font-semibold text-lg">Click to upload documents</h4>
                        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                          PDF, JPG, or PNG files. Max 5MB each.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Suggested: Pay stubs, Bank statements, Driver's License
                        </p>
                      </div>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Uploaded Files</h4>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-md">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                              <span className="text-xs text-muted-foreground uppercase border px-1 rounded">{file.type.split('/')[1] || 'FILE'}</span>
                            </div>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => removeFile(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg flex gap-3 items-start">
                      <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div className="text-sm text-primary/80">
                        <p className="font-semibold mb-1">Secure Upload</p>
                        <p>Your documents are encrypted and stored securely. We only share this information with the property management team.</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-between pt-6 border-t bg-muted/5">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button type="button" onClick={nextStep} className="bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold">
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">4</span>
                      Review & Submit
                    </CardTitle>
                    <CardDescription>Please review your information before submitting.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    <div className="bg-muted/30 rounded-lg p-4 space-y-4">
                      <h3 className="font-semibold text-lg text-primary border-b pb-2">Summary</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Full Name</p>
                          <p className="font-medium">{form.getValues("firstName")} {form.getValues("lastName")}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="font-medium">{form.getValues("email")}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="font-medium">{form.getValues("phone")}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Move-in Date</p>
                          <p className="font-medium">{form.getValues("moveInDate")}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Income</p>
                          <p className="font-medium">${form.getValues("income")}/year</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Documents</p>
                          <p className="font-medium">{uploadedFiles.length} files attached</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-base font-semibold">
                                I agree to the Terms & Conditions
                              </FormLabel>
                              <p className="text-sm text-muted-foreground">
                                By submitting this application, I authorize Choice Properties to verify the information provided and conduct necessary background and credit checks. I acknowledge that I have read and agree to the <Link href="/terms"><a className="text-secondary hover:underline">Terms & Conditions</a></Link>.
                              </p>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                  </CardContent>
                  <CardFooter className="justify-between pt-6 border-t bg-muted/5">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-green-600 hover:bg-green-700 text-white font-bold h-12 px-8 text-lg shadow-md hover:shadow-xl transition-all"
                      disabled={!form.formState.isValid || !form.getValues("consent")}
                    >
                      Submit Application <CheckCircle2 className="ml-2 h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

            </form>
          </Form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
