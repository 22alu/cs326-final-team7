let reviews = [{'username': 'Andy','courseName': "haha", 'rating': 4, 'comment': "BEST CLASS EVER", 'university': "UMass"}, 
{'username': 'Andy','courseName': "lmao",'rating': 2, 'comment': "WORST CLASS EVER", 'university': "UMass"}, 
{'username': 'Andy','courseName': "blahblah",'rating': 3, 'comment': "OKAYEST CLASS EVER", 'university': "UMass"}];

let users = [{'username': 'Andy', 'email': "fuck off", 'password': "lmao", 'reviews':reviews}];

export function updateUser(name, newname, email, password){
    for(let count in users){
        if(users[count].username === name){
            users[count].username = newname;
            users[count].email = email;
            users[count].password = password;
            for(let rev in users[count].reviews){
                reviews[rev].username = newname;
            }
        }
    }
    console.log(users);
}

export function getAllUsers(){
    return users;
}

export function getUser(name){
    console.log(users);
    for(let count in users){
        if(users[count].username === name){
            return users[count];
        }
    }
}

export function getPassword(name){
    for(let count in users){
        if(users[count].username === name){
            return users[count].password;
        }
    }
}

export function getUserReviews(name){
    let output = [];
    for(let count in reviews){
        if(reviews[count].username === name){
            output.push(reviews[count]);
        }
    }
    return output;
}

export function updateReviews(haha){
    console.log(reviews);
    reviews = haha;
    console.log(reviews);
}
  