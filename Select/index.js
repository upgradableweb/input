import { useId, useState } from 'react'
import { Cancel } from '@upgradableweb/icons'
import ClickAwayListener from '@upgradableweb/utils/ClickAwayListener'


export default function Select({ options = [], value = '', name, onChange, label, placeholder, multiple, readOnly, active, error, errorText }) {

    const [open, setOpen] = useState(false)
    const [data, setData] = useState(null)
    const id = useId()
    const err = Boolean(error) || active && Boolean(error)

    function handleChange(e) {
        setData(e.target.value)
        !multiple && onChange(e)
    }

    const focus = () => document.getElementById(id)?.focus()

    function reset() {
        setData(null)
        onChange({ target: { name, value: '' } })
        focus()
    }

    const onClickAway = () => {
        typeof data === 'string' && setData(null)
        setOpen(false)
    }

    const handleOutput = (dat) => {

        data && setData(null)
        if (multiple) {
            onChange(dat)
        } else {
            onChange && onChange({ target: { name, value: dat } })
        }
        setOpen(false)
    }

    const search = options.filter(d => d.trim().toLowerCase().includes((data || '').trim().toLowerCase()))

    return (
        <div className='relative w-full'>
            <label htmlFor={id} className='bold'>{label}</label>
            {multiple}
            <ClickAwayListener onClickAway={onClickAway} className='relative'>
                <input
                    id={id}
                    onFocus={() => setOpen(true)}
                    className='input mt-2'
                    onChange={handleChange}
                    value={typeof data === 'string' ? data : value}
                    placeholder={placeholder}
                    name={name}
                    readOnly={readOnly}
                    autoComplete='off'
                />
                {!readOnly && value &&
                    <button onClick={reset} className='auto-complete-close'>
                        <Cancel />
                    </button>}
                {open &&
                    <div className='auto-complete-container'>
                        {search.map((dat, i) => {
                            const selected = value === dat ? 'menu-selected' : ''
                            return (
                                <Option
                                    key={i}
                                    className={selected}
                                    onClick={() => handleOutput(dat)}
                                >
                                    {dat}
                                </Option>)
                        })}
                        {!search.length && <Option onClick={() => handleOutput(data)}>{`Add new "${data}"`}</Option>}
                    </div>
                }
            </ClickAwayListener>
            {err && <div className="mt-1 mx-2 ce">{errorText}</div>}
        </div>
    )
}

function Option({ className, onClick, ...props }) {
    return (
        <div
            {...props}
            role='button'
            className={`menu p-2 ${className}`}
            onClick={onClick}
        />)
}


export function StaticSelect({ label, name, value, onChange, children, active, error, errorText }) {
    const [b, setB] = useState(false)
    const id = useId()
    const err = b && Boolean(error) || active && Boolean(error)
    return (
        <div className={`${err ? 'error' : ''}`}>
            <label className='bold' htmlFor={id}>{label}</label>
            <select
                name={name}
                className='input mt-2'
                value={value}
                onChange={onChange}
                id={id}
                onBlur={() => setB(true)}
            >
                {children}
            </select>
            {err && <div className="mt-1 mx-2 ce">{errorText}</div>}
        </div>)
}
