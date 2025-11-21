import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import MapView from "@/components/map-view";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="bg-primary py-16 text-center">
        <h1 className="font-heading text-4xl font-bold text-white mb-4" data-aos="zoom-in">Contact Us</h1>
        <p className="text-primary-foreground/80 max-w-xl mx-auto px-4" data-aos="fade-up" data-aos-delay="200">
          We're here to help. Reach out to us for any inquiries or support.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8" data-aos="fade-right">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">
                Whether you're looking for a new home or have questions about your current lease, our team is ready to assist you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-secondary mt-1 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Visit Us</h3>
                  <p className="text-muted-foreground">123 Real Estate Ave<br />City, ST 12345</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-secondary mt-1 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-secondary mt-1 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">Email Us</h3>
                  <p className="text-muted-foreground">info@choiceproperties.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MessageSquare className="h-6 w-6 text-secondary mt-1 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">WhatsApp</h3>
                  <p className="text-muted-foreground">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-8" data-aos="fade-left">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." className="min-h-[150px]" />
                  </div>

                  <Button className="w-full bg-primary text-white font-bold h-12 hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Map */}
            <div className="h-[300px] w-full rounded-xl overflow-hidden shadow-sm border">
              <MapView 
                zoom={15}
                markers={[{ position: [34.0522, -118.2437], title: "Choice Properties HQ", description: "123 Real Estate Ave" }]}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
