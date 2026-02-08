"use client";

export function MeetFounderSection() {
  return (
    <section className="relative w-full bg-[#080D1A] overflow-hidden">
      {/* Desktop Layout (lg+) */}
      <div
        className="hidden lg:block max-w-[1792px] mx-auto relative"
        style={{ minHeight: "clamp(600px, 56.09vw, 1005px)" }}
      >
        {/* Green gradient strip */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: "68.36%",
            right: "1.7%",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(20, 48, 90, 0.5) 54.81%, #14305A 100%)",
          }}
        />

        {/* MVP Badge */}
        <img
          src="/images/about/MVP_Badge_Preferred_Blue3005_RGB 2.png"
          alt="Microsoft MVP Badge"
          className="absolute top-0 z-20"
          style={{
            left: "82.31%",
            width: "clamp(80px, 8.93vw, 160px)",
            height: "auto",
          }}
        />

        {/* Founder Image */}
        <img
          src="/images/home/Mentor image.png"
          alt="Mohammed Alfan"
          className="absolute bottom-0 z-10"
          style={{
            left: "48.53%",
            width: "41.59%",
            maxWidth: "745.3px",
            height: "auto",
          }}
        />

        {/* Left Content */}
        <div
          className="relative z-10"
          style={{
            width: "47.65%",
            paddingLeft: "clamp(24px, 8.54vw, 153px)",
            paddingTop: "clamp(48px, 4.91vw, 88px)",
            paddingBottom: "clamp(48px, 4.69vw, 84px)",
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 800,
              fontSize: "clamp(32px, 3.29vw, 59px)",
              lineHeight: "0.98",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "rgba(255, 255, 255, 0.62)" }}>MEET</span>
            <br />
            <span className="text-white">MOHAMMED</span>
            <br />
            <span className="text-white">ALFAN</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontWeight: 700,
              fontSize: "clamp(14px, 1.34vw, 24px)",
              color: "#009412",
              marginTop: "clamp(12px, 1vw, 18px)",
            }}
          >
            Founder | Corporate Trainer
          </p>

          {/* Bio */}
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.34vw, 24px)",
              lineHeight: "1.5",
              color: "rgba(255, 255, 255, 0.61)",
              maxWidth: "clamp(400px, 39.12vw, 701px)",
              marginTop: "clamp(24px, 3.85vw, 69px)",
            }}
          >
            Mohammed Alfan, a four-time Microsoft Most Valuable Professional
            (MVP) awardee, is the Founder and Chief Consultant at Axtella, a data analytics training and consulting firm based in
            India. With over 17+ years of professional experience working with
            leading organizations such as TCS, IBM, Accenture, and Cargill, he
            specializes in Power BI and Excel-based analytics consulting and
            training. He has also delivered corporate training programs for
            renowned multinational companies and serves as a guest lecturer at
            the National Institute of Technology (India), Ajman University, and
            the American University of Sharjah (UAE).
          </p>

          {/* Signature */}
          <div style={{ marginTop: "clamp(24px, 3.9vw, 70px)" }}>
            <img
              src="/images/about/signature.png"
              alt="Mohammed Alfan Signature"
              style={{
                width: "clamp(120px, 12.39vw, 222px)",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout (below lg) */}
      <div className="lg:hidden">
        {/* Text Content */}
        <div className="px-6 sm:px-8 md:px-12 py-10 sm:py-14">
          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 800,
              fontSize: "clamp(32px, 8vw, 50px)",
              lineHeight: "0.98",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "rgba(255, 255, 255, 0.62)" }}>MEET</span>
            <br />
            <span className="text-white">MOHAMMED</span>
            <br />
            <span className="text-white">ALFAN</span>
          </h2>

          {/* Subtitle */}
          <p
            className="mt-3"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontWeight: 700,
              fontSize: "clamp(14px, 3.5vw, 20px)",
              color: "#009412",
            }}
          >
            Founder | Corporate Trainer
          </p>

          {/* Bio */}
          <p
            className="mt-5"
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontWeight: 400,
              fontSize: "clamp(14px, 3.2vw, 18px)",
              lineHeight: "1.5",
              color: "rgba(255, 255, 255, 0.61)",
            }}
          >
            Mohammed Alfan, a four-time Microsoft Most Valuable Professional
            (MVP) awardee, is the Founder and Chief Consultant at Axtella, a data analytics training and consulting firm based in
            India. With over 17+ years of professional experience working with
            leading organizations such as TCS, IBM, Accenture, and Cargill, he
            specializes in Power BI and Excel-based analytics consulting and
            training. He has also delivered corporate training programs for
            renowned multinational companies and serves as a guest lecturer at
            the National Institute of Technology (India), Ajman University, and
            the American University of Sharjah (UAE).
          </p>

          {/* Signature */}
          <div className="mt-6">
            <img
              src="/images/about/signature.png"
              alt="Mohammed Alfan Signature"
              className="w-[120px] sm:w-[150px] md:w-[180px] h-auto"
            />
          </div>
        </div>

        {/* Image Area */}
        <div className="relative w-full" style={{ height: "clamp(350px, 60vw, 550px)" }}>
          {/* Green gradient */}
          <div
            className="absolute top-0 right-0 bottom-0 w-[55%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(20, 48, 90, 0.5) 54.81%, #14305A 100%)",
            }}
          />

          {/* MVP Badge */}
          <img
            src="/images/about/MVP_Badge_Preferred_Blue3005_RGB 2.png"
            alt="Microsoft MVP Badge"
            className="absolute top-0 right-[6%] z-20 h-auto"
            style={{ width: "clamp(60px, 12vw, 100px)" }}
          />

          {/* Founder Image */}
          <img
            src="/images/home/Mentor image.png"
            alt="Mohammed Alfan"
            className="absolute bottom-0 left-[5%] z-10 h-full w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
