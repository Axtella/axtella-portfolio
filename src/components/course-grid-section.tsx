"use client";

interface CourseCard {
  id: number;
  tag: string;
  title: string;
  lessons: string;
  duration: string;
  level: string;
  description: string;
  theme: "excel" | "powerbi";
}

const courses: CourseCard[] = [
  {
    id: 1,
    tag: "AXTELLA",
    title: "MICROSOFT EXCEL BASIC TO ADVANCE",
    lessons: "1 lessons",
    duration: "35:13:00",
    level: "Basic",
    description: "Dive into our curated feed for the freshest insights and essential",
    theme: "excel",
  },
  {
    id: 2,
    tag: "AXTELLA",
    title: "MICROSOFT POWER BI BASIC TO ADVANCE",
    lessons: "1 lessons",
    duration: "42:30:00",
    level: "Next",
    description: "Learn to visualize data like the best insight right at your fingertips",
    theme: "powerbi",
  },
  {
    id: 3,
    tag: "AXTELLA",
    title: "MICROSOFT EXCEL BASIC TO ADVANCE",
    lessons: "1 lessons",
    duration: "35:13:00",
    level: "Basic",
    description: "Dive into our curated feed for the freshest insights and essential",
    theme: "excel",
  },
  {
    id: 4,
    tag: "AXTELLA",
    title: "MICROSOFT POWER BI BASIC TO ADVANCE",
    lessons: "1 lessons",
    duration: "42:30:00",
    level: "Next",
    description: "Learn to visualize data like the best insight right at your fingertips",
    theme: "powerbi",
  },
];

export function CourseGridSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-24">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-[58px] justify-items-center">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CourseCardProps {
  course: CourseCard;
}

function CourseCard({ course }: CourseCardProps) {
  const isExcel = course.theme === "excel";

  return (
    <div
      className="group relative overflow-hidden transition-all duration-300 md:hover:scale-[1.02] cursor-pointer w-full max-w-[702px] rounded-2xl lg:rounded-[20px] 2xl:rounded-[23px]"
      style={{
        background: "#FFFFFF",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.11)",
      }}
    >
      {/* Card Container - Flex Column */}
      <div className="relative h-full flex flex-col">
        {/* Top Section - White Background with Content */}
        <div
          className="flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-8 xl:p-10 2xl:p-12 min-h-[320px] md:min-h-[360px] lg:min-h-[300px] xl:min-h-[340px] 2xl:min-h-[446px]"
        >
          {/* Content Group */}
          <div>
            {/* Tag */}
            <div
              className="mb-2 md:mb-3 text-sm lg:text-[15px] xl:text-base 2xl:text-[19px] leading-normal uppercase"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#009412",
              }}
            >
              {course.tag}
            </div>

            {/* Title */}
            <h3
              className="mb-4 md:mb-6 text-xl sm:text-2xl lg:text-[26px] xl:text-3xl 2xl:text-[40px] leading-tight 2xl:leading-[43px] uppercase text-black"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontWeight: 800,
              }}
            >
              {course.title}
            </h3>

            {/* Metadata Icons Row */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
              {/* Lessons */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <div
                  className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-black/5"
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ color: "#000000" }}
                  >
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
                <span
                  className="text-xs xl:text-[13px] 2xl:text-sm text-black"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 400,
                  }}
                >
                  {course.lessons}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <div
                  className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-black/5"
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ color: "#000000" }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span
                  className="text-xs xl:text-[13px] 2xl:text-sm text-black"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 400,
                  }}
                >
                  {course.duration}
                </span>
              </div>

              {/* Level */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <div
                  className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-black/5"
                >
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ color: "#000000" }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span
                  className="text-xs xl:text-[13px] 2xl:text-sm text-black"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    fontWeight: 400,
                  }}
                >
                  {course.level}
                </span>
              </div>
            </div>

            {/* Description */}
            <p
              className="text-sm lg:text-[15px] xl:text-base 2xl:text-lg leading-relaxed text-black"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              {course.description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-4 md:mt-6 lg:mt-4 xl:mt-5 2xl:mt-6">
            <button
              className="group/btn relative overflow-hidden transition-all duration-300 hover:shadow-lg bg-[#009412] rounded-full px-5 py-2.5 lg:px-6 lg:py-2 xl:px-6 xl:py-2.5 2xl:px-7 2xl:py-3"
            >
              <span
                className="relative z-10 block transition-opacity duration-300 group-hover/btn:opacity-90 text-white text-center text-base lg:text-[16px] xl:text-lg 2xl:text-[22px] leading-snug 2xl:leading-[42px]"
                style={{
                  fontFamily: "var(--font-plus-jakarta)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                Take this Course
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Section - Colored Background with Watermark */}
        <div
          className="relative overflow-hidden flex items-center justify-center gap-4 md:gap-6 lg:gap-8 px-4 sm:px-6 md:px-10 lg:px-8 xl:px-10 2xl:px-12 h-[200px] md:h-[230px] lg:h-[180px] xl:h-[220px] 2xl:h-[281px] rounded-b-2xl lg:rounded-b-[20px] 2xl:rounded-b-[23px]"
          style={{
            background: isExcel
              ? "linear-gradient(89.81deg, #214B3A 0.18%, #03D372 97.2%)"
              : "linear-gradient(89.81deg, #f59e0b 0.18%, #eab308 97.2%)",
          }}
        >
          {/* Large Watermark Text */}
          <div
            className="text-[32px] md:text-[40px] lg:text-[36px] xl:text-[46px] 2xl:text-[58px] leading-tight uppercase"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "rgba(238, 238, 238, 0.3)",
            }}
          >
            {isExcel ? (
              <>
                MICROSOFT
                <br />
                EXCEL
              </>
            ) : (
              <>
                MICROSOFT
                <br />
                POWER BI
              </>
            )}
          </div>

          {/* Icon */}
          <div
            className="flex-shrink-0 w-[100px] md:w-[130px] lg:w-[110px] xl:w-[140px] 2xl:w-[180px] h-[100px] md:h-[130px] lg:h-[110px] xl:h-[140px] 2xl:h-[180px]"
          >
            {isExcel ? (
              // Excel Icon - Using actual image
              <img
                src="/images/courses/Gemini_Generated_Image_domyyqdomyyqdomy 1.png"
                alt="Excel Icon"
                className="w-full h-full object-contain"
              />
            ) : (
              // Power BI Icon - Using actual image
              <img
                src="/images/courses/image 122.png"
                alt="Power BI Icon"
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: isExcel
            ? "radial-gradient(circle at center, rgba(0, 148, 18, 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle at center, rgba(245, 158, 11, 0.2) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
