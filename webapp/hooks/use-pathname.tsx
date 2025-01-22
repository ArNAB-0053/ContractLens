import { usePathname } from "next/navigation"

export const usePath = () => {
    const pathname = usePathname()
    const splitedPath = pathname.split('/')
    let pageName = splitedPath[splitedPath.length - 1]
    return {pageName, pathname}
}