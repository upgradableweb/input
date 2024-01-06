import { useId } from 'react'

export default function Checkbox({ className, name, checked, value, onChange, label }) {
    const id = useId()
    return (
        <div className={`df aic gap-2 ${className}`}>
            <input
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                type="checkbox"
            />
            <label htmlFor={id} className="bold">{label}</label>
        </div>
    )
}
