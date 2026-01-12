import Image from "next/image"

export default function FormLogo({ src = "/logo-main.svg" }: { src?: string }) {
  return (
    <div className="mb-10 flex justify-center">
      <div className="relative h-22 w-22">
        <Image
          src={src}
          alt="DayKeeper"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>
  )
}
