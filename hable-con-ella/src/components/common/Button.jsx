import PropTypes from 'prop-types'
import './Button.scss'

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    className = '',
    ...rest
}) => {
    const classes = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        disabled ? 'disabled' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ')

return (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
        {...rest}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

export default Button