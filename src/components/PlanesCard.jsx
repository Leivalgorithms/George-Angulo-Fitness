import "./css/PlanesCard.css";

const PlanesCard = ({ tarifas }) => {
    // Función para formatear el período según el tipo
    const getPeriodo = (tipo) => {
        if (tipo.toLowerCase().includes('trimestre')) return 'TRIMESTRE';
        if (tipo.toLowerCase().includes('sesion') || tipo.toLowerCase().includes('sesión')) return 'SESIÓN';
        return 'MES';
    };

    // Función para formatear el precio
    const formatearPrecio = (monto, moneda) => {
        const numeroFormateado = Number(monto).toLocaleString();
        const simbolo = moneda === 'USD' ? '$' : '₡';
        return `${simbolo}${numeroFormateado}`;
    };

    return (
        <div className="planes-container">
            {tarifas && tarifas.length > 0 ? (
                tarifas.map((plan, index) => (
                    <div
                        className={`plan-card ${plan.destacado ? 'featured' : ''}`}
                        key={index}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {plan.destacado && (
                            <div className="featured-badge">Más Popular</div>
                        )}

                        <h3 className="plan-tipo">{plan.tipo}</h3>

                        <div className="plan-precio-container">
                            <div className="plan-precio">
                                {formatearPrecio(plan.monto, plan.moneda)}
                            </div>
                            <div className="mes-label">
                                / {getPeriodo(plan.tipo)}
                            </div>
                        </div>

                        {plan.beneficios && plan.beneficios.length > 0 ? (
                            <ul className="plan-beneficios">
                                {plan.beneficios.map((beneficio, idx) => (
                                    <li key={idx}>{beneficio}</li>
                                ))}
                            </ul>
                        ) : (
                            <ul className="plan-beneficios">
                                <li>Acceso completo al gimnasio</li>
                                <li>Uso de todos los equipos</li>
                                <li>Asesoría básica incluida</li>
                            </ul>
                        )}
                    </div>
                ))
            ) : (
                <div className="no-planes-message">
                    No hay planes disponibles en este momento
                </div>
            )}
        </div>
    );
};

export default PlanesCard;