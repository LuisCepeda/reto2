import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "./button"

export function RadioButtonsGroup() {
    return (
    <>
        <RadioGroup defaultValue="option-1">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-1" id="option-one" className="hidden"/>
                    <Label htmlFor="option-1" className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-600">Option One</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-2" id="option-two" className="hidden"/>
                    <Label htmlFor="option-2" className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-600">Option Two</Label>
            </div>
        </RadioGroup>

    </>
  )
}

