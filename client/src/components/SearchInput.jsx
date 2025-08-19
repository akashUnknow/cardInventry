import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchInput({ value, onChange, onClear }) {
  return (
    <div className="relative w-full">
      {/* Left search icon */}
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70" />

      <Input
        type="search"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-9"
      />

      {/* Right clear button */}
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-muted"
        >
          <X className="h-4 w-4 opacity-70" />
        </button>
      )}
    </div>
  )
}
