export function TrustBar() {
  return (
    <section
      aria-label="Trusted by engineering teams"
      className="border-y border-border py-[calc(24px+4vh)]"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-3 text-foreground" data-animate="fade">
          {/* Arcline */}
          <div className="flex items-center justify-center border-r border-b border-border py-8">
            <svg
              className="h-7"
              viewBox="0 0 100 28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M0 22C0 10 8 4 16 4s12 4 12 10c0 4-3 7-7 7s-6-2-6-5 2-4 4-4"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              <path d="M36 21V9h1.4l.2 2c.8-1.4 2.2-2.2 4-2.2v1.8h-.4c-2 0-3.4 1.2-3.4 3.6V21H36zm11.4.2c-2.6 0-4.4-1.8-4.4-4.4V9h1.8v7.4c0 1.8 1 3 2.8 3s3-1.4 3-3.2V9h1.8v12h-1.4l-.2-1.8c-.8 1.2-2 2-3.4 2zM56 21V9h1.4l.2 2c.8-1.4 2.2-2.2 4-2.2v1.8h-.4c-2 0-3.4 1.2-3.4 3.6V21H56zm13 .2c-3.4 0-5.6-2.6-5.6-6.2s2.2-6.2 5.6-6.2c2 0 3.4.8 4.2 2l-1.2 1c-.6-.8-1.6-1.4-3-1.4-2.4 0-3.8 1.8-3.8 4.6s1.4 4.6 3.8 4.6c1.4 0 2.4-.6 3-1.4l1.2 1c-.8 1.2-2.2 2-4.2 2z" />
            </svg>
          </div>
          {/* Solara */}
          <div className="flex items-center justify-center border-r border-b border-border py-8">
            <svg
              className="h-7"
              viewBox="0 0 110 28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="14"
                cy="14"
                r="10"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
              />
              <path
                d="M10 14h8M14 10v8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path d="M34 21.2c-1.6 0-3-.6-4-1.6l1-1.2c.8.8 1.8 1.2 3 1.2 1.4 0 2-.6 2-1.4 0-.8-.6-1.2-2.4-1.6-2.2-.5-3.4-1.2-3.4-3 0-1.8 1.4-3 3.6-3 1.4 0 2.6.5 3.4 1.2l-1 1.2c-.6-.6-1.5-1-2.4-1-1.2 0-1.8.5-1.8 1.3 0 .8.6 1.1 2.4 1.6 2.2.5 3.4 1.2 3.4 3 0 1.8-1.5 3.1-3.8 3.1zM44.6 21.2c-3.4 0-5.6-2.6-5.6-6.2s2.2-6.2 5.6-6.2 5.6 2.6 5.6 6.2-2.2 6.2-5.6 6.2zm0-1.6c2.4 0 3.8-1.8 3.8-4.6s-1.4-4.6-3.8-4.6-3.8 1.8-3.8 4.6 1.4 4.6 3.8 4.6zM54 21V3h1.8v18H54z" />
            </svg>
          </div>
          {/* Pavelock */}
          <div className="flex items-center justify-center border-b border-border py-8">
            <svg
              className="h-7"
              viewBox="0 0 120 28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M4 4h8l8 20H12L4 4z" fill="currentColor" opacity="0.6" />
              <path d="M12 4h8l8 20H20L12 4z" fill="currentColor" />
              <path d="M38 21V9h1.4l.2 2c.8-1.4 2.2-2.2 4-2.2 2.6 0 4.2 1.8 4.2 4.6V21H46v-7.2c0-2-1-3.2-2.8-3.2s-3.2 1.4-3.2 3.4V21H38zm15 0V9h1.4l.2 2c.8-1.4 2-2.2 3.6-2.2 1.4 0 2.4.6 3 1.8.8-1.2 2.2-1.8 3.6-1.8 2.4 0 3.8 1.6 3.8 4.4V21h-1.8v-7.2c0-2-.8-3.2-2.4-3.2-1.6 0-2.8 1.4-2.8 3.4V21h-1.8v-7.2c0-2-.8-3.2-2.4-3.2-1.6 0-2.8 1.4-2.8 3.4V21H53z" />
            </svg>
          </div>
          {/* Nimbus */}
          <div className="flex items-center justify-center border-r border-border py-8">
            <svg
              className="h-7"
              viewBox="0 0 100 28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 20L8 6l6 14H2z"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
                strokeLinejoin="round"
              />
              <path d="M5 14h6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M24 21V9h1.4l.2 2c.8-1.4 2.2-2.2 4-2.2 2.6 0 4.2 1.8 4.2 4.6V21H32v-7.2c0-2-1-3.2-2.8-3.2s-3.2 1.4-3.2 3.4V21H24zm16 0V9h1.4l.2 2c.8-1.4 2-2.2 3.6-2.2 1.4 0 2.4.6 3 1.8.8-1.2 2.2-1.8 3.6-1.8 2.4 0 3.8 1.6 3.8 4.4V21h-1.8v-7.2c0-2-.8-3.2-2.4-3.2-1.6 0-2.8 1.4-2.8 3.4V21h-1.8v-7.2c0-2-.8-3.2-2.4-3.2-1.6 0-2.8 1.4-2.8 3.4V21H40z" />
            </svg>
          </div>
          {/* Quartex */}
          <div className="flex items-center justify-center border-r border-border py-8">
            <svg
              className="h-7"
              viewBox="0 0 110 28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect x="2" y="6" width="7" height="7" fill="currentColor" />
              <rect
                x="11"
                y="6"
                width="7"
                height="7"
                fill="currentColor"
                opacity="0.4"
              />
              <rect
                x="2"
                y="15"
                width="7"
                height="7"
                fill="currentColor"
                opacity="0.4"
              />
              <rect x="11" y="15" width="7" height="7" fill="currentColor" />
              <path d="M30 21.2c-3.4 0-5.2-2.2-5.2-5.4V9h1.8v6.6c0 2.4 1.2 3.8 3.4 3.8s3.4-1.4 3.4-3.8V9h1.8v6.8c0 3.2-1.8 5.4-5.2 5.4zM41.4 21V3H43v7c.8-1 2-1.6 3.4-1.6 2.6 0 4.2 1.8 4.2 4.6V21h-1.8v-7.2c0-2-1-3.2-2.8-3.2-1.8 0-3.2 1.4-3.2 3.4V21h-1.4z" />
            </svg>
          </div>
          {/* Wavefront */}
          <div className="flex items-center justify-center py-8">
            <svg
              className="h-7"
              viewBox="0 0 90 28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 18c3-10 5-10 8 0s5 10 8 0"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path d="M32 21L28 9h1.8l2.6 8.4L35.2 9h1.8l2.8 8.4L42.4 9h1.8L40.2 21h-1.6l-2.8-8-2.8 8H32zm20 0V9h1.8v12H52zm7 .2c-3.4 0-5.6-2.6-5.6-6.2s2.2-6.2 5.6-6.2 5.6 2.6 5.6 6.2-2.2 6.2-5.6 6.2zm0-1.6c2.4 0 3.8-1.8 3.8-4.6s-1.4-4.6-3.8-4.6-3.8 1.8-3.8 4.6 1.4 4.6 3.8 4.6z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
