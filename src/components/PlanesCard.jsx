import React from "react";
import "./css/PlanesCard.css";

const PlanesCard = ({ tarifas }) => {
    return (
        <div className="planes-container">
            {tarifas && tarifas.length > 0 ? (
                tarifas.map((plan, index) => (
                    <div className={`plan-card ${plan.destacado ? 'destacado' : ''}`} key={index}>
                        {plan.destacado && (
                            <div className="popular-label">MÁS POPULAR</div>
                        )}
                        <h3 className="plan-tipo">{plan.tipo}</h3>
                        <p className="plan-precio">
                            ₡{Number(plan.monto).toLocaleString()}/<span className="mes-label">MES</span>
                        </p>
                        <ul className="plan-beneficios">
                            {plan.beneficios.map((beneficio, idx) => (
                                <li key={idx}>{beneficio}</li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No hay planes disponibles.</p>
            )}
        </div>
    );
};

export default PlanesCard;
