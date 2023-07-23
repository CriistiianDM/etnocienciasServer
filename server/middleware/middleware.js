
function _0x5364($,x){let a=_0x130d();return(_0x5364=function($,x){return a[$-=165]})($,x)}const _0x315fd3=_0x5364;!function($,x){let a=_0x5364,_=$();for(;;)try{let n=-parseInt(a(175))/1*(parseInt(a(174))/2)+parseInt(a(171))/3*(-parseInt(a(173))/4)+-parseInt(a(176))/5+parseInt(a(166))/6*(parseInt(a(178))/7)+parseInt(a(165))/8*(-parseInt(a(167))/9)+-parseInt(a(177))/10*(parseInt(a(172))/11)+parseInt(a(168))/12;if(180575===n)break;_.push(_.shift())}catch(t){_.push(_.shift())}}(_0x130d,180575);const tokenAccess=[_0x315fd3(169),"aaaaaaa",_0x315fd3(170)];function _0x130d(){let $=["6IZzJrz","3236121XVuRcS","12727284LKLusb","jdwnshbjbdybwq8h","1626262620292829062","15Qnypqk","724713ZpiaXq","227804EUGAmG","22IfZINv","1459YRgfKy","1251905Wvxnii","10fpDvIZ","676235lyaMYF","8OaEyIY"];return(_0x130d=function(){return $})()}

const acceses_origin = [
    'http://localhost:5173',
    'https://etnociencias.vercel.app'
]


/**
  *  @author : cristian Duvan Machado <cristian.machado@correounivalle.edu.co>
  *  @decs  : middelware para validar que solo se puedan ingresar peticiones desde el frontend
*/
const only_petitions_fronted = async (req, res, next) => {
    
    if ( acceses_origin.includes((req.headers).origin)  &&
        (req.headers).authorization === tokenAccess.join('')) {
            next();
    }
    else {
        res.status(401).send('acceso denegado');
    }

}


module.exports = {
    only_petitions_fronted
}