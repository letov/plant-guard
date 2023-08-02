import { FC } from 'react';
import { Range as ReactRange } from 'react-range';

interface RangeProps {
    value: number[];
    min: number;
    max: number;
    setValue: (value: number[]) => void;
}

const Range: FC<RangeProps> = (rangeProps) => {
    return (
        <ReactRange
            values={rangeProps.value}
            step={1}
            min={rangeProps.min}
            max={rangeProps.max}
            onChange={(value) => rangeProps.setValue(value)}
            renderTrack={({ props, children }) => (
                <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '100%'
                    }}
                >
                    <div
                        ref={props.ref}
                        style={{
                            height: '5px',
                            width: '100%',
                            borderRadius: '4px',
                            backgroundColor: '#f0f0f0',
                            alignSelf: 'center'
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({ props, isDragged }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '20px',
                        width: '10px',
                        borderRadius: '4px',
                        backgroundColor: '#FFF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #AAA'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#000000'
                        }}
                    >
                        {rangeProps.value[0]}
                    </div>
                    <div
                        style={{
                            height: '16px',
                            width: '5px',
                            backgroundColor: isDragged ? '#000000' : '#CCC'
                        }}
                    />
                </div>
            )}
        />
    );
};

export default Range;
