import "./Carrito.css"

export const Cupon = ({t}) => {
  return (
    <>
      <div class="row">
                <div class="col-md-6">
                  <div class="row mb-5">
                    {/* <div class="col-md-6 mb-3 mb-md-0">
                      <button class="btn btn-black btn-sm btn-block">Update Cart</button>
                    </div>
                    <div class="col-md-6">
                      <button class="btn btn-outline-black btn-sm btn-block">Continue Shopping</button>
                    </div> */}
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <label class="text-black h4" for="coupon">Cup&oacute;n</label>
                      <p>Ingrese codigo de su cup&oacute;n.</p>
                    </div>
                    <div class="col-md-8 mb-3 mb-md-0">
                      <input type="text" class="form-control py-3" id="coupon" placeholder="Codigo de cup&oacute;n" required/>
                    </div>
                    <div class="col-md-4">
                      <button class="botoncc">Aplicar Cup&oacute;n</button>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 pl-5">
                  <div class="row justify-content-end">
                    <div class="col-md-7">
                      <div class="row">
                        <div class="col-md-12 text-right border-bottom mb-5">
                          <h3 class="text-black h4 text-uppercase">Total del Carrito</h3>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-md-6">
                          <span class="text-black">Subtotal</span>
                        </div>
                        <div class="col-md-6 text-right">
                          <strong class="text-black">{t}</strong>
                        </div>
                      </div>
                      <div class="row mb-5">
                        <div class="col-md-6">
                          <span class="text-black">Total</span>
                        </div>
                        <div class="col-md-6 text-right">
                          <strong class="text-black">{t}</strong>
                        </div>
                      </div>
        
                      <div class="row">
                        <div class="col-md-12">
                          <button class="botoncc btn-lg py-3 btn-block" onclick="window.location='checkout.html'">Proceder al  Pago </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </>
  )
}


