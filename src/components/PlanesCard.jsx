import "./css/PlanesCard.css";

const PlanesCard = ({ tarifas }) => {
    return (
        <div className="planes-container">
            {tarifas && tarifas.length > 0 ? (
                tarifas.map((plan, index) => (
                    <div className={`plan-card ${plan.destacado ? 'featured' : ''}`} key={index}>
                        {plan.destacado && (
                            <div className="featured-badge">MÁS POPULAR</div>
                        )}
                        <h3 className="plan-tipo">{plan.tipo}</h3>
                        <p className="plan-precio">
                            {plan.moneda === 'USD' ? '$' : '₡'}{Number(plan.monto).toLocaleString()}<span className="mes-label">/{plan.tipo.toLowerCase().includes('trimestre') ? 'TRIMESTRE' : plan.tipo.toLowerCase().includes('sesion') ? 'SESIÓN' : 'MES'}</span>
                        </p>
                        <ul className="plan-beneficios">
                            {plan.beneficios && plan.beneficios.map((beneficio, idx) => (
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