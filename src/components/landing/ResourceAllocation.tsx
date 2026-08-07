import { DashedLine } from "@/components/landing/DashedLine"
import { cn } from "@/lib/utils"

const topItems = [
  {
    title: "Reusable doc templates.",
    description:
      "Draft lightning-fast documentation with smart instructions and project templates.",
    images: [
      {
        src: "/landing/resource-allocation/templates.webp",
        alt: "Documentation template interface",
        width: 495,
        height: 186,
      },
    ],
    className:
      "flex-1 [&>.title-container]:mb-5 md:[&>.title-container]:mb-8 xl:[&>.image-container]:translate-x-6 [&>.image-container]:translate-x-2",
    fade: [""],
  },
  {
    title: "Simplify your stack.",
    description:
      "Connect GitHub, GitLab, and Notion,stop juggling Confluence, SharePoint, and stale wikis.",
    images: [
      {
        src: "/landing/logos/github.svg",
        alt: "GitHub logo",
        width: 48,
        height: 48,
      },
      {
        src: "/landing/logos/gitlab.svg",
        alt: "GitLab logo",
        width: 48,
        height: 48,
      },
      {
        src: "/landing/logos/notion.svg",
        alt: "Notion logo",
        width: 48,
        height: 48,
      },
      {
        src: "/landing/logos/openai.svg",
        alt: "OpenAI logo",
        width: 48,
        height: 48,
      },
      {
        src: "/landing/logos/claude.svg",
        alt: "Claude logo",
        width: 48,
        height: 48,
      },
      {
        src: "/landing/logos/confluence.svg",
        alt: "Confluence logo",
        width: 48,
        height: 48,
      },
      {
        src: "/landing/logos/drive.svg",
        alt: "Google Drive logo",
        width: 48,
        height: 48,
      },
      {
        src: "/landing/logos/notion.svg",
        alt: "Notion logo",
        width: 48,
        height: 48,
      },
    ],
    className:
      "flex-1 [&>.title-container]:mb-5 md:[&>.title-container]:mb-8 md:[&>.title-container]:translate-x-2 xl:[&>.title-container]:translate-x-4 [&>.title-container]:translate-x-0",
    fade: [],
  },
]

const bottomItems = [
  {
    title: "Archive what you outgrow.",
    description:
      "Retire outdated docs without losing history,restore anything when you need it again.",
    images: [
      {
        src: "/landing/resource-allocation/graveyard.webp",
        alt: "Archive interface",
        width: 305,
        height: 280,
      },
    ],
    className:
      "[&>.title-container]:mb-5 md:[&>.title-container]:mb-8 xl:[&>.image-container]:translate-x-6 [&>.image-container]:translate-x-2",
    fade: ["bottom"],
  },
  {
    title: "Collaboration built in.",
    description:
      "Comment, review, and approve docs together so documentation stays a team habit.",
    images: [
      {
        src: "/landing/resource-allocation/discussions.webp",
        alt: "Collaboration interface",
        width: 320,
        height: 103,
      },
    ],
    className:
      "justify-normal [&>.title-container]:mb-5 md:[&>.title-container]:mb-0 [&>.image-container]:flex-1 md:[&>.image-container]:place-items-center md:[&>.image-container]:-translate-y-3",
    fade: [""],
  },
  {
    title: "Stay notified.",
    description:
      "Get alerts when docs drift from the codebase or a teammate needs your review.",
    images: [
      {
        src: "/landing/resource-allocation/notifications.webp",
        alt: "Notifications interface",
        width: 305,
        height: 280,
      },
    ],
    className:
      "[&>.title-container]:mb-5 md:[&>.title-container]:mb-8 xl:[&>.image-container]:translate-x-6 [&>.image-container]:translate-x-2",
    fade: ["bottom"],
  },
]

export function ResourceAllocation() {
  return (
    <section
      id="resource-allocation"
      className="overflow-hidden py-[calc(48px+8vh)]"
    >
      <div className="mx-auto max-w-5xl px-6">
        <h2
          data-animate
          className="text-center text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          Keep documentation and delivery in the same loop
        </h2>

        <div className="mt-10 md:mt-12">
          <DashedLine orientation="horizontal" className="scale-x-105" />

          <div className="relative flex max-md:flex-col">
            {topItems.map((item, i) => (
              <Item
                key={item.title}
                item={item}
                isLast={i === topItems.length - 1}
              />
            ))}
          </div>
          <DashedLine orientation="horizontal" className="scale-x-105" />

          <div className="relative grid md:grid-cols-3">
            {bottomItems.map((item, i) => (
              <Item
                key={item.title}
                item={item}
                isLast={i === bottomItems.length - 1}
                className="md:pb-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ItemProps {
  item: (typeof topItems)[number] | (typeof bottomItems)[number]
  isLast?: boolean
  className?: string
}

function Item({ item, isLast, className }: ItemProps) {
  return (
    <div
      data-animate
      className={cn(
        "relative flex flex-col justify-between px-0 py-6 md:px-6 md:py-8",
        className,
        item.className,
      )}
    >
      <div className="title-container text-balance">
        <h3 className="inline text-base font-semibold tracking-tight">
          {item.title}{" "}
        </h3>
        <span className="text-sm leading-relaxed text-muted-foreground">
          {" "}
          {item.description}
        </span>
      </div>

      {item.fade.includes("bottom") && (
        <div className="from-muted/80 absolute inset-0 z-10 bg-linear-to-t via-transparent to-transparent md:hidden" />
      )}
      {item.images.length > 4 ? (
        <div className="relative overflow-hidden">
          <div className="flex flex-col gap-5">
            <div className="flex translate-x-4 justify-end gap-5">
              {item.images.slice(0, 4).map((image, j) => (
                <div
                  key={`${image.src}-${j}`}
                  className="bg-background grid aspect-square size-14 place-items-center rounded-2xl p-2 lg:size-16"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-contain object-left-top"
                  />
                  <div className="from-muted/80 absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l to-transparent" />
                </div>
              ))}
            </div>
            <div className="flex -translate-x-4 gap-5">
              {item.images.slice(4).map((image, j) => (
                <div
                  key={`${image.src}-${j}`}
                  className="bg-background grid aspect-square size-14 place-items-center rounded-2xl lg:size-16"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-contain object-left-top"
                  />
                  <div className="from-muted absolute inset-y-0 bottom-0 left-0 z-10 w-14 bg-linear-to-r to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="image-container grid grid-cols-1 gap-4">
          {item.images.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="object-contain object-left-top"
            />
          ))}
        </div>
      )}

      {!isLast && (
        <>
          <DashedLine
            orientation="vertical"
            className="absolute top-0 right-0 max-md:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute inset-x-0 bottom-0 md:hidden"
          />
        </>
      )}
    </div>
  )
}
