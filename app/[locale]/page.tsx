// Imports
import { Container, Section } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { LanguageCode } from "@/lib/nubint";
import { Award, BookText, Check, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const VIDEO_URL =
  "https://beyondcity-public.s3.ap-northeast-2.amazonaws.com/hls/demo/master.m3u8";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: LanguageCode }>;
}) {
  const { locale } = await params; // ✅ 이렇게 안전하게 접근
  const t = await getTranslations();

  const features = [
    {
      icon: BookText,
      title: t("home.features.summary"),
      description: t("home.features.summaryDesc"),
    },
    {
      icon: Users,
      title: t("home.features.conversation"),
      description: t("home.features.conversationDesc"),
    },
    {
      icon: Award,
      title: t("home.features.unlimited"),
      description: t("home.features.unlimitedDesc"),
    },
  ];

  const pricingPlans = [
    {
      label: t("home.pricing.monthlyLabel"),
      price: "\u20A99,900",
      description: "",
      period: t("home.pricing.perMonth"),
      features: [
        t("home.pricing.features.unlimited"),
        t("home.pricing.features.expert"),
        t("home.pricing.features.audio"),
      ],
      cta: t("home.pricing.subscribeNow"),
      buttonVariant: "outline",
    },
    {
      label: t("home.pricing.yearlyLabel"),
      price: "\u20A999,000",
      description: "",
      period: t("home.pricing.perYear"),
      popular: true,
      features: [
        t("home.pricing.features.unlimited"),
        t("home.pricing.features.expert"),
        t("home.pricing.features.audio"),
      ],
      cta: t("home.pricing.subscribeNow"),
      buttonVariant: "solid",
    },
  ];

  return (
    <>
      {/* Hero */}
      <Section className="bg-background min-h-[calc(100vh-70px)] flex items-center">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl leading-normal sm:leading-snug sm:text-5xl font-extrabold text-primary bg-red">
                {t("home.hero.title")}
              </h1>
              <p className="text-primary/80 md:text-xl max-w-xl">
                {t("home.hero.description")}
              </p>

              <div className="flex sm:flex-row gap-2">
                <Link href="mailto:contact@beyondcity.co.kr">
                  <Button
                    asChild
                    className="w-full sm:w-auto"
                    style={{ backgroundColor: "#041427" }}
                  >
                    {t("home.hero.cta")}
                  </Button>
                </Link>

                <Link href="mailto:contact@beyondcity.co.kr">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto hover:bg-muted"
                  >
                    {t("home.hero.cta2")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section id="features" className="bg-primary/5 py-12 md:py-24 lg:py-32">
        <Container className="text-center space-y-10">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary/10 px-3 py-1 text-sm text-secondary">
              {t("home.features.label")}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
              {t("home.features.title")}
            </h2>
            <p className="max-w-3xl mx-auto text-primary/80 md:text-xl">
              {t("home.features.description")}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
            {features.map(({ icon: Icon, title, description }, i) => (
              <div
                key={i}
                className="flex flex-col items-center space-y-4 rounded-lg border border-primary/10 bg-background p-6 shadow-sm"
              >
                <div className="rounded-full bg-secondary/10 p-4">
                  <Icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary">{title}</h3>
                <p className="text-primary/80 text-center">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section
        id="testimonials"
        className="bg-background py-12 md:py-24 lg:py-32"
      >
        <Container>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary/10 px-3 py-1 text-sm text-secondary">
                {t("home.testimonials.label")}
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
                {t("home.testimonials.title")}
              </h2>
              <p className="max-w-[900px] text-primary/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.testimonials.description")}
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            {[1, 2, 3].map((testimonial) => (
              <div
                key={testimonial}
                className="flex flex-col justify-between rounded-lg border border-primary/10 bg-background p-6 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-secondary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-primary/80">
                    {t(`home.testimonials.items.${testimonial}.quote`)}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  {/* <div className="rounded-full overflow-hidden h-10 w-10 bg-muted">
                    <Image
                      src={`/placeholder.svg?height=40&width=40&text=${testimonial}`}
                      alt="프로필"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div> */}
                  <div>
                    <p className="text-sm font-medium text-primary">
                      {t(`home.testimonials.items.${testimonial}.name`)}
                    </p>
                    <p className="text-xs text-primary/80">
                      {t(`home.testimonials.items.${testimonial}.role`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="bg-primary/5 py-12 md:py-24 lg:py-32">
        <Container className="text-center space-y-10">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary/10 px-3 py-1 text-sm text-secondary">
              {t("home.pricing.label")}
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
              {t("home.pricing.title")}
            </h2>
            <p className="max-w-3xl mx-auto text-primary/80 md:text-xl">
              {t("home.pricing.description")}
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className="relative flex flex-col rounded-lg border border-primary/10 bg-background p-6 shadow-sm"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-white">
                    {t("home.pricing.popular")}
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary">
                    {plan.label}
                  </h3>
                  <p className="text-primary/80">{plan.description}</p>
                </div>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-primary/80">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-2 text-primary text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.cta ? (
                  <Button
                    className="mt-6"
                    variant={
                      plan.buttonVariant === "outline" ? "outline" : undefined
                    }
                    style={
                      plan.buttonVariant !== "outline"
                        ? { backgroundColor: "#041427" }
                        : {}
                    }
                  >
                    {plan.cta}
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      {/* <Section className="bg-background py-12 md:py-24 lg:py-32">
        <Container className="text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {t("home.newsletter.title")}
          </h2>
          <p className="text-primary/80 max-w-xl mx-auto md:text-xl">
            {t("home.newsletter.description")}
          </p>
          <div className="w-full max-w-md mx-auto space-y-2">
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder={t("home.newsletter.placeholder") || "이메일 주소"}
                className="flex-1"
              />
              <Button style={{ backgroundColor: "#041427" }}>
                {t("home.newsletter.cta")}
              </Button>
            </form>
            <p className="text-xs text-primary/80">
              {t("home.newsletter.privacy")}
            </p>
          </div>
        </Container>
      </Section> */}
    </>
  );
}
