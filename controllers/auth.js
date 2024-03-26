const User = require('../modules/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const regUser = async (req, res) => {
    try {
      let { login, password } = req.body;
      let checkuser = await User.findOne({ login });
      if (checkuser) {
        return res.status(409).json({ message: 'Bunday foydalanuvchi allaqachon ro`yhatdan o`tgan' });
      }
      const hashPass = await bcrypt.hash(password, 10);
      const user = new User({ login, password: hashPass, createdAt: new Date() });
      await user.save();
      res.status(200).json({
        message: 'Muvofaqqiyatli ro`yhatdan o`tdingiz',
        user: user
      });
    } catch (error) {
      res.status(500).json({
        error
      });
    }
  }
  
  let login = async (req,res)=>{
    let {login,password} = req.body 
    let user = await User.findOne({login})
    if(!user){
      return res.status(404).json({message:'Bunday foydalanuvchi topilmadi'});
    }
    const comparepassword = await bcrypt.compare(password, user.password)
    if(!comparepassword){
      return res.status(403).json({
        message: 'Parol noto`g`ri'
      });
    }
  
    const token = jwt.sign({id:user._id},process.env.secretkey,{expiresIn: '1d'})
    res.json({
      status: 'Tizimga xush kelibsiz',
      token,
      user
    });
  }
  
   
  

module.exports = {
    regUser,
    login
}