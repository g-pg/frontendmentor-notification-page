const notifCounter = document.querySelector(".notif-counter");
const markAllReadBtn = document.querySelector(".all-read-btn");
const notifUlEl = document.querySelector(".notif-list");

let events = {
	reactedToUserPost: "reacted to your recent post",
	followedUser: "followed you",
	joinedUserGroup: "has joined your group",
	sentPrivateMessage: "sent you a private message",
	commentedUserPic: "commented on your picture",
	leftGroup: "left the group",
};

let notifArray = [
	{
		name: `Mark Webber`,
		profilePicturePath: "assets/images/avatar-mark-webber.webp",
		event: events.reactedToUserPost,
		postName: "My first tournament today!",
		time: "1m",
		read: false,
		rendered: false,
		upToDate: false,
	},

	{
		name: "Angela Gray",
		profilePicturePath: "assets/images/avatar-angela-gray.webp",
		event: events.followedUser,
		time: "5m",
		read: false,
		rendered: false,
		upToDate: false,
	},

	{
		name: "Jacob Thompson",
		profilePicturePath: "assets/images/avatar-jacob-thompson.webp",
		event: events.joinedUserGroup,
		groupName: "Chess Club",
		time: "1 day",
		read: false,
		rendered: false,
		upToDate: false,
	},

	{
		name: "Rizky Hasanuddin",
		profilePicturePath: "assets/images/avatar-rizky-hasanuddin.webp",
		event: events.sentPrivateMessage,
		time: "5 days",
		privateMessage:
			"Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
		read: true,
		rendered: false,
		upToDate: false,
	},

	{
		name: "Kimberly Smith",
		profilePicturePath: "assets/images/avatar-kimberly-smith.webp",
		event: events.commentedUserPic,
		time: "1 week",
		picture: "assets/images/image-chess.webp",
		read: true,
		rendered: false,
		upToDate: false,
	},

	{
		name: "Nathan Peterson",
		profilePicturePath: "assets/images/avatar-nathan-peterson.webp",
		event: events.reactedToUserPost,
		postName: "5 end-game strategies to increase your win rate",
		time: "2 weeks",
		read: true,
		rendered: false,
		upToDate: false,
	},

	{
		name: "Anna Kim",
		profilePicturePath: "assets/images/avatar-anna-kim.webp",
		event: events.leftGroup,
		groupName: "Chess Club",
		time: "2 weeks",
		read: true,
		rendered: false,
		upToDate: false,
	},
];

function renderNotif() {
	let newLi;
	notifArray.forEach((el, index) => {
		if (el.rendered === false || el.upToDate === false) {
			el.rendered = true;
			el.upToDate = true;

			newLi = document.createElement("li");

			newLi.classList.add("notif-item");

			if (el.read === false) {
				newLi.classList.add("notif-item-not-read");
			}

			let contentOfNotif = "";

			// adicionar if para link de grupo ou post
			if (el.postName || el.groupName) {
				if (el.postName) {
					contentOfNotif += `<a href="#"
                class="notif-link post-link">${el.postName}</a>`;
				} else {
					contentOfNotif += `<a href="#"
                class="notif-link group-link">${el.groupName}</a>`;
				}
			}

			let privateMessage = "";
			if (el.privateMessage) {
				privateMessage = `<div class="notif-priv-message-wrapper">
                <p class="notif-priv-message">${el.privateMessage}</p>
              </div>`;
			}

			let picturePath = "";
			if (el.picture) {
				picturePath = `<a href="#" class="notif-picture-link"><img src="/assets/images/image-chess.webp"></a>`;
			}

			newLi.innerHTML = `
            <img src="${el.profilePicturePath}" alt="Profile Avatar" class="notif-profile-picture">
            <div class="notif-content-wrapper">
            <p class="notif-text">
            <a href="#" class="notif-profile-name">${el.name}</a>
            ${el.event}
            ${contentOfNotif}
            </p>
            <p class="notif-timer">${el.time} ago</p>
            ${privateMessage}
            </div>
            ${picturePath}
            `;

			newLi.setAttribute("data-index", index);
			newLi.addEventListener("click", markAsRead);
		}

		notifUlEl.append(newLi);

		updateCounter();
	});
}

function markAllRead() {
	let notifRendered = document.querySelectorAll(".notif-item");

	notifRendered.forEach((el) => {
		el.classList.remove("notif-item-not-read");
	});

	notifArray.forEach((el) => {
		el.read = true;
	});

	updateCounter();
}

function markAsRead() {
	let index = this.getAttribute("data-index");
	notifArray[index].read = true;
	this.classList.remove("notif-item-not-read");
	updateCounter();
}

function updateCounter() {
	let counter = 0;
	for (let i = 0; i < notifArray.length; i++) {
		if (notifArray[i].read === false) {
			counter += 1;
		}
	}

	notifCounter.textContent = counter;

	if (counter === 0) {
		notifCounter.classList.add("invisible");
	} else {
		notifCounter.classList.remove("invisible");
	}
}

markAllReadBtn.addEventListener("click", markAllRead);

renderNotif();
