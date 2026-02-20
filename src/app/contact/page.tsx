"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

const CONTACT_EMAIL = siteConfig.supportEmail;

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a question about our courses or how Beauty School Online
              works? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What is your enquiry about?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your enquiry..."
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Alternative Contact */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border bg-secondary/50 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Email Us Directly</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prefer to send an email directly? You can reach us at:
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                <p className="mt-6 text-sm text-muted-foreground">
                  We aim to respond to all enquiries within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
